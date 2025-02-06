import { notifications, NotificationData } from "@mantine/notifications";

export const show = (options: NotificationData): void => {
  notifications.show(options);
};

export const update = (options: NotificationData): void => {
  notifications.update(options);
};
