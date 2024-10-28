export const fetchData = async (apiUrl: string,endpoint: string) => {
    const response = await fetch(`${apiUrl}${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};