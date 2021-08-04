import { useQuery } from "@apollo/client";
import { keysToCamelCase, sortPipesByName } from "../../../utils/helpers";
import GET_ORGANIZATIONS from "../queries/getOrganization";

export default function useGetOrganizationPipes() {
  const { loading, error, data } = useQuery(GET_ORGANIZATIONS, {
    variables: { id: "300562393" },
  });

  return {
    pipeData: data
      ? [...sortPipesByName(data?.organization?.pipes.map(keysToCamelCase))]
      : [],
    pipeLoading: loading,
    pipeErrors: error,
  };
}
