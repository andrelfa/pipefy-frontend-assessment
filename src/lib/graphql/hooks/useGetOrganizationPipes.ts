import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { keysToCamelCase, sortPipesByName } from "../../../utils/helpers";
import GET_ORGANIZATIONS from "../queries/getOrganization";

export default function useGetOrganizationPipes() {
  const { loading, error, data } = useQuery(GET_ORGANIZATIONS, {
    variables: { id: "300562393" },
  });

  const memoizedData = useMemo(
    () =>
      data
        ? [...sortPipesByName(data?.organization?.pipes.map(keysToCamelCase))]
        : [],
    [data]
  );

  return {
    pipeData: memoizedData,
    pipeLoading: loading,
    pipeErrors: error,
  };
}
