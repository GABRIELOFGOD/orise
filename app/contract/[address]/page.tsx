import ContractVerifier from "@/components/layout/contract/address/contract-verifier";

interface ContractProps {
  params: {
    address: string;
  }
}

const ContractVerified = async ({ params }: ContractProps) => {
  const { address } = await params

  return (
    <div>
      <ContractVerifier
        address={address}
      />
    </div>
  );
};

export default ContractVerified;
