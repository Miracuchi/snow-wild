import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
type HandleSubmitProps = () => Promise<void>;

function StepperFormActions({
  handleSubmit,
}: {
  handleSubmit: HandleSubmitProps;
}) {
  const router = useRouter();
  const backToHomePage = () => {
    router.push("/");
  };
  return (
    <div className="w-full flex  justify-center items-center gap-2">
      <>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="my-2 mx-2  bg-green-500 text-white rounded hover:bg-green-700"
        >
          Créer la réservation et payer
        </Button>
        <Button
          onClick={backToHomePage}
          className=" bg-red-500 text-white rounded hover:bg-red-700"
        >
          Abandonner
        </Button>
      </>
    </div>
  );
}

export default StepperFormActions;
