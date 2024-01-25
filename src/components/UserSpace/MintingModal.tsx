"use client";

import { Button, Modal } from "flowbite-react";

function MintingModal({
   openModal,
   setOpenModal,
   modalData,
   titleModal,
   onClickAction
}: {
   openModal: boolean;
   setOpenModal: CallableFunction;
   modalData: string;
   titleModal: string;
   onClickAction? : CallableFunction
}) {
   return (
      <>
         <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>{titleModal}</Modal.Header>
            <Modal.Body>
               <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                     {modalData}
                  </p>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={() => {
                     setOpenModal(false);
                     if (onClickAction){
                        onClickAction();
                     }
                  }}
               >
                  Fermer
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default MintingModal;
