import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VehicleList } from "./components/VehicleList";

export default function HomePage() {
  return (
    <main className="bg-dark-900 min-h-screen">
      <Header />
      <Hero />
      <VehicleList />
    </main>
  );
}
