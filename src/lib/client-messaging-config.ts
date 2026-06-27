export type ClientMessagingOption = {
  key: string;
  label: string;
  username: string;
  displayName: string;
};

export const CLIENT_MESSAGING_OPTIONS: ClientMessagingOption[] = [
  {
    key: "westport",
    label: "Westport",
    username: "westport",
    displayName: "Westport",
  },
];

export function getClientMessagingOption(key: string) {
  return CLIENT_MESSAGING_OPTIONS.find((client) => client.key === key) ?? null;
}
