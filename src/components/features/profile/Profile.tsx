"use client";

import { Box, Container, Grid, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { IUser } from "@/libs/types/user";
import { ProfileForm } from "./components/ProfileForm";
import { ChangePassword } from "./components/ChangePassword";
import { Favorite } from "./components/Favorite";
import { RecommendRestaurant } from "./components/RecommendRestaurant";
import { DropzoneAvatar } from "./components/DropzoneIAvatar";
import { notifications } from "@mantine/notifications";

const TABS = [
  {
    label: "Hồ sơ cá nhân",
    value: "profile",
    ui: <ProfileForm />,
  },
  {
    label: "Thay đổi mật khẩu",
    value: "change-password",
    ui: <ChangePassword />,
  },
  {
    label: "Yêu thích",
    value: "favorite",
    ui: <Favorite />,
  },
  {
    label: "Giới thiệu nhà hàng",
    value: "restaurant",
    ui: <RecommendRestaurant />,
  },
];

export const Profile = () => {
  const requestAuth = useAxiosAuth();
  const [activeTab, setActiveTab] = React.useState(TABS[0].value);
  const queryClient = useQueryClient();

  const { data } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await requestAuth.get("/auth/me");
      return response.data;
    },
    enabled: JSON.parse(localStorage.getItem("isLogin") || "false"),
  });

  const { mutate } = useMutation({
    mutationFn: async ({ url }: { url: string }) => {
      await requestAuth.patch(`/admin/users/${data?.id}`, { avatar: url });
    },
    onSuccess: () => {
      notifications.show({
        title: "Upload ảnh thành công",
        message: "Ảnh của bạn đã được cập nhật",
        color: "green",
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  return (
    <Box mt={30}>
      <Container size="lg">
        <Grid>
          <Grid.Col span={3}>
            <Stack align="center">
              <Stack align="center" gap={8}>
                <DropzoneAvatar
                  value={data?.avatar as string}
                  onChange={(fileUrl) => {
                    console.log(fileUrl);

                    mutate({ url: fileUrl });
                  }}
                />

                <Title order={3}>{data?.name}</Title>
                <Text>{data?.email}</Text>
              </Stack>

              <Stack
                style={{
                  border: "1px solid var(--mantine-color-gray-2)",
                  padding: 16,
                }}
              >
                {TABS.map((tab) => (
                  <Text
                    style={{
                      padding: "6px 10px",
                      cursor: "pointer",
                      borderRadius: 4,
                      backgroundColor:
                        activeTab === tab.value
                          ? "var(--mantine-color-gray-1)"
                          : "transparent",
                      color:
                        activeTab === tab.value
                          ? "var(--mantine-color-orange-6)"
                          : "black",
                    }}
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </Text>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={9}
            style={{
              border: "1px solid var(--mantine-color-gray-2)",
              padding: 16,
            }}
          >
            {TABS.find((tab) => tab.value === activeTab)?.ui}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};
