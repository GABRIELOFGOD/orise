"use client";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SearchContract = () => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const router = useRouter();  
  
  const goToContract = () => {
    if (contractAddress.trim() !== "") {
      router.push(`/contract/${contractAddress}`);
      setContractAddress("");
    } else {
      toast.error("Please enter a valid contract address.");
      setContractAddress("");
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      goToContract();
    }
  }
  
  return (
    <div>
      <div className="flex border-border/90 rounded-md p-3 bg-white">
        <input
          type="text"
          placeholder="Enter contract address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full placeholder:text-muted-foreground bg-transparent outline-none h-full my-auto"
          onKeyDown={handleKeyDown}
        />
        <Button
          className="my-auto w-fit h-fit"
          onClick={goToContract}
        >
          <SearchIcon size={20} />
        </Button>
      </div>
    </div>
  )
}
export default SearchContract;