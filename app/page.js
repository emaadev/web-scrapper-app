import ProductsList from "@/components/ProductsList";
import SearchComponent from "@/components/SearchComponent";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-cyan-200 to-blue-300 bg-opacity-70 flex flex-col lg:flex-row gap-[20px] lg:gap-[100px] min-h-screen p-16">
      <div className="flex flex-row lg:flex-col justify-start items-center leading-10">
        <div>
          <h1 className="text-[36px] font-bold">
            Welcome to the <br /> MercadoLibre Scrapper! 🔎
          </h1>{" "}
          <p className="text-[18px] mb-8">
            Insert a product and a limit for the products search.
          </p>
          <SearchComponent />
        </div>

        <Image
          src="/intro-image.png"
          priority
          width={1024}
          height={1024}
          className="hidden md:block w-[400px] h-[400px]"
          alt="TODO"
        />
      </div>

      <div className="flex-1">
        <ProductsList />
      </div>
    </main>
  );
}
