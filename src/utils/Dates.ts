export default function getDates() {
   const currentYear = new Date().getFullYear();
   const dates: Number[] = []!;
   for (let i = currentYear - 300; i <= currentYear; i++) {
      dates.push(i);
   }
   return dates.reverse();
}
