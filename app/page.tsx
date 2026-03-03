
import { Button } from "@/components/ui/button";
import Link
 from "next/link";
export default function Home() {
  return ( 
    <div className="flex flex-col items-center gap-3 justify-center h-screen">
      Estes es el home de mi app
      <Link href="/dashboard">
        <Button>Ir al dashboard</Button>
      </Link>
    </div>
   );
}
