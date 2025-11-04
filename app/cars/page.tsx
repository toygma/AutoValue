import { Suspense } from "react";
import CarsPage from "./_components/carsPage";

const Cars = () => {
  return (
    <Suspense fallback={<span>Yükleniyor...</span>}>
      <CarsPage />
    </Suspense>
  );
};

export default Cars;
