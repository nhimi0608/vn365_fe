"use client";

import { useEffect, useRef, useState } from "react";
import { Group, rem, Box, Image } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileRejection,
  FileWithPath,
  MIME_TYPES,
} from "@mantine/dropzone";
import { IconX, IconPhoto, IconUpload } from "@tabler/icons-react";
import { uploadToFirebase } from "@/libs/firebase/firebaseConfig";
import { notifications } from "@mantine/notifications";

interface Props extends Omit<DropzoneProps, "onChange" | "onDrop"> {
  onChange: (fileUrl: string) => void;
  value: string;
}

export type FilePreviewType = {
  preview: string;
} & File;

export function DropzoneAvatar({ onChange, value, ...props }: Props) {
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FilePreviewType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDrop = async (files: FileWithPath[]) => {
    setFiles(
      files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    const res = await uploadToFirebase(files[0], (progress: number) => {
      setLoading(true);

      if (progress === 100) {
        setLoading(false);
      }
    });

    onChange(res.downloadUrl);
  };

  const handleReject = (files: FileRejection[]) => {
    notifications.show({
      title: "File rejected",
      message: files[0].errors[0].message,
      color: "red",
    });
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Dropzone
      openRef={openRef}
      onReject={handleReject}
      radius="md"
      accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
      maxSize={30 * 1024 ** 2}
      {...props}
      onDrop={handleDrop}
      styles={{
        root: {
          border: "1px dashed #d9d9d9",
          borderRadius: "50%",
          padding: "unset",
          overflow: "hidden",
        },
      }}
      loading={loading}
    >
      <Group
        justify="center"
        gap="xl"
        mih={128}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>

        <Dropzone.Idle>
          <Box
            style={{
              width: "100%",
              height: "100%",

              maxHeight: rem(128),
              maxWidth: rem(128),

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {value || files.length > 0 ? (
              <Image
                src={files?.[0]?.preview || value}
                alt="preview"
                style={{
                  maxHeight: rem(240),
                  maxWidth: rem(240),
                  objectFit: "cover",
                }}
              />
            ) : (
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            )}
          </Box>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  );
}
