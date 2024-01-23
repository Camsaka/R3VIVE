"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function MintingModal({
   openModal,
   setOpenModal,
   modalData,
}: {
   openModal: boolean;
   setOpenModal: any;
   modalData: string;
}) {
   return (
      <>
         {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
         <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Génération de votre certificat</Modal.Header>
            <Modal.Body>
               <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                     {modalData}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setOpenModal(false)}>I accept</Button>
               <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default MintingModal;
