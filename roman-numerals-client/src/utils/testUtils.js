export const mockFetchResponse = (data, isSuccess = true) => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: isSuccess,
      json: async () => data,
      text: async () => JSON.stringify(data),
    });
};
  