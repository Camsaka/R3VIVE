import React from "react";
import Button from "../HomeComponents/Button";
import LinkList from "../HomeComponents/LinkList";
import Logo from "../Logo";
import ConnectYourWalletButton from "../Web3/ConnectYourWalletButton";

function HeadBarDisconnected() {
   return (
      <header className="bg-black text-white p-4 flex items-center justify-between">
         <Logo w={50} h={50}></Logo>
         <LinkList></LinkList>
         <ConnectYourWalletButton/>
      </header>
   );
}

export default HeadBarDisconnected;
