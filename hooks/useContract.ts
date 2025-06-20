import { BACKEND_URL } from "@/lib/api-utils";

export const useContract = () => {

  const getContractAbi = async (address: string) => {
    try {
      const request = await fetch(`${BACKEND_URL}/contract/${address}/abi`);
      const response = await request.json();
      if (!request.ok) {
        throw new Error(response.message || "Failed to fetch contract ABI");
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    getContractAbi
  }
  
}