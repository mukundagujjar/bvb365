import Image from "next/image";
import GlobalLink from "@/components/GlobalLink";

const Trades = () => {
    return (
        <div className="flex flex-col w-full justify-center gap-8 items-center">
            <div className="flex flex-col w-full px-4 lg:w-3/4 mx-auto gap-8">
                <h2 className="text-4xl font-bold text-center">Our Trades</h2>


                <div className="px-5 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <figure key={num} className="mb-4 break-inside-avoid w-full">
                            <Image
                                src={`/trades/t${num}.jpg`}
                                alt={`Trade ${num}`}
                                width={500}
                                height={500}
                                className="w-full h-auto rounded-lg"
                            />
                        </figure>
                    ))}
                </div>

            </div>
            <GlobalLink href="/contact" title="Contact us" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />
        </div>
    );
};

export default Trades;