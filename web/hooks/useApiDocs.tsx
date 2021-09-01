import useSWR from "swr";
import { useAuthState } from "lib/context/AuthContext";
import { useCollectionQuery } from "lib/generated/client";

interface Props {
  projectId: string;
  collectionId: string;
}

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Error("An error occurred while fetching the api docs");
  }

  return res.json();
};

export function useApiDocs({ projectId, collectionId }: Props): [{}, Error] {
  const token = useAuthState();
  const { data: collection } = useCollectionQuery({
    ssr: false,
    variables: {
      id: collectionId,
      projectId,
    },
  });
  const { data, error } = useSWR(
    collection
      ? [
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${
            collection.collection.name
          }/docs?project_id=${projectId as string}`,
          token,
        ]
      : null,
    fetcher
  );

  if (error) return [data, error];
  if (!data) return [data, error];

  return [data, error];
}
