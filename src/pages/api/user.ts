export type User = {
  UID: string;
  picture_url: string;
  bio: string;
  friends_uids: string[] | null;
  username: string;
};

export let user: User | null = null;

export const getUser = async (): Promise<User | null> => {
  if (user) return user;

  const token = localStorage.getItem("uid");

  if (!token) return null;

  const res = await fetch("/api/user/info?uid=me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  user = await res.json();
  return user;
};
