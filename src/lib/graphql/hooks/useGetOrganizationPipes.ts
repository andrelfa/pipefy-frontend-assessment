import { ApolloError, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Pipe } from "../../../types/Pipe";
import { keysToCamelCase, sortPipesByName } from "../../../utils/helpers";
import GET_ORGANIZATIONS from "../queries/getOrganization";

type UseGetOrganizationPipesType = {
  pipeData: Pipe[];
  pipeLoading: boolean;
  pipeError: ApolloError | undefined;
};

export default function useGetOrganizationPipes(): UseGetOrganizationPipesType {
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
    pipeError: error,
  };
}
