import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StockSearch from "@/components/dashboard/StockSearch";
import Watchlist from "@/components/dashboard/Watchlist";
import Footer from "@/components/home/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        <StockSearch />
        <Watchlist />
        <Footer />
      </div>
    </div>
  );
}