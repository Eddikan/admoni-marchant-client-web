import React, { useState } from "react";
import Button from "@/components/ui/Button";
import ModalWrapper from "@/components/ui/ModalWrapper";
import LinkModalContent from "@/components/wallet/LinkModalContent";

export default function LinkAccount() {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsLinkModalOpen(true)} icon="/icons/add.svg">
        Link New Account
      </Button>
      <ModalWrapper
        title="Link Account"
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      >
        <LinkModalContent onClose={() => setIsLinkModalOpen(false)} />
      </ModalWrapper>
    </div>
  );
}
