import { useQueries } from "@tanstack/react-query"
import { getPreviewByCategory } from "../service/mealDB"


const useHomeCategories = (categories: string[]) => {
const queries = useQueries({
    queries: categories.map((cat) => ({
        queryKey: ["category", cat],
        queryFn: () => getPreviewByCategory(cat),
    })),
});

return {
    queries,
    data: queries.map((q) => q.data || []),
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    error: queries.find((q) => q.error),

}
};

export default useHomeCategories;