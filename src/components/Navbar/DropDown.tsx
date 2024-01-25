'use client';

import { Dropdown } from 'flowbite-react';
import { useRouter } from 'next/navigation';

function DropDown() {
   const router = useRouter();
  return (
    <Dropdown label="Espace client" inline>
      <Dropdown.Item onClick={() => router.push("/user-space/requests")}>Mes requêtes</Dropdown.Item>
      <Dropdown.Item onClick={() => router.push("/user-space/certificats")}>Mes certificats</Dropdown.Item>
    </Dropdown>
  );
}

export default DropDown;