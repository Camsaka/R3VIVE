interface StatusOfRequestProps {
   rejected: boolean;
   mintable: boolean;
}

export function StatusOfRequest(props: StatusOfRequestProps) {
   if (props.rejected) {
      return <p className="text-red-700">Rejected</p>;
   }
   if (props.mintable) return <p className="text-green-600">Mintable</p>;
   else return <p>En cours de traitement...</p>;

}

export default StatusOfRequest;
