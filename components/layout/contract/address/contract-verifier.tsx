"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useContract } from "@/hooks/useContract";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ContractVerifier = ({ address }: { address: string }) => {
  const [contractAddress, setContractAddress] = useState<string>(address);
  const [contractAbi, setContractAbi] = useState<any>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const { getContractAbi } = useContract();

  const fetchContractAbi = async (address: string) => {
    try {
      const response = await getContractAbi(address);
      setContractAbi(response);
      console.log("Contract ABI:", response);
    } catch (error) {
      toast.error("Failed to fetch contract ABI");
      console.error("Error fetching contract ABI:", error);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      fetchContractAbi(contractAddress);
      setShowMessage(true); // Show message initially
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide after 10 seconds
      }, 10000); // or 15000 for 15 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-3">
      <div className="border border-border/80 rounded-md shadow-sm p-4 w-full md:max-w-2xl mx-auto bg-white flex flex-col gap-5">
        <div className="text-center">
          <p className="md:text-2xl text-xl font-bold text-center">Verify and Publish Contract</p>
          <p className="text-muted-foreground text-sm">
            Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Orise will match the compiled code with that on the blockchain.
          </p>
        </div>

        <div>
          <div className="flex gap-5 justify-between">
            <p className="text-muted-foreground text-sm truncate my-auto">
              Contract Address: <span className="font-bold">{contractAddress}</span>
            </p>

            <div
              className="relative w-fit"
              onMouseEnter={() => setShowMessage(true)}
              onMouseLeave={() => setShowMessage(false)}
            >
              {contractAbi == null && showMessage && (
                <p className="absolute animate-in animate-out duration-200 p-3 bg-white text-black w-[200px] border border-border/30 rounded-md mx-auto -mt-16 right-0 text-xs">
                  Contract not verified, click <span className="font-bold">Not Verified</span> to verify your contract
                </p>
              )}
              <Button
                variant={"link"}
                className={`${contractAbi ? "text-green-500" : "text-red-500"} my-auto underline text-nowrap relative`}
                disabled={contractAbi !== null}
              >
                {contractAbi ? "Verified" : "Not Verified"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Contract ABI"
            className="w-full h-40"
            value={contractAbi || ""}
          />

          <div className="w-full justify-end flex gap-3 md:gap-5">
            <Button
              variant={"outline"}
              className="flex gap-2"
              disabled={!contractAbi}
              onClick={() => {
                navigator.clipboard.writeText(contractAbi);
                toast.success("ABI copied to clipboard");
              }}
            >
              <Copy size={15} className="my-auto" />
              <p className="text-sm my-auto">Copy ABI</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractVerifier;
