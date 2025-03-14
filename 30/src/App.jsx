import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "./components/ui/card";

function App() {
    return (
        <>
            <div className="absolute right-0 left-0 align-middle Main flex   self-center justify-center   justify-items-center m-2  ">
                <div className="w-dvw flex-auto flex-row items-center justify-items-center">
                    {/* Header */}

                    <h1 className="font-bold text-3xl mt-5 mb-8">
                        The Nots App Pro
                    </h1>

                    {/* Inputs */}

                    <Card className=" flex w-3/8 h-30   ">
                        <div className="flex   justify-center h-full items-center ">
                            <Button className="mr-2 ml-2 ">
                                The Cn Button
                            </Button>
                            <Input
                                placeholder=" You Note Here ! "
                                className=" w-2/6 mr-2 ml-2 "
                            />
                        </div>
                    </Card>

                    {/* Nots Section */}

                    <Card className=" flex w-3/8  mt-4 ">
                        {/* Nots Continer */}

                        <div className="TaskHome pr-5 pl-5  flex-auto">
                            {/* The Nots */}
                            <Card className="  flex items-center justify-between align-middle  mt-5 flex-row pl-4 pr-6 ">
                                <h1 className="flex align-middle justify-self-center h-full font-bold text-xl">
                                    The Tiltle Of The Header
                                </h1>
                                <div className="NotButContiner flex flex-row gap-1.5">
                                    <Button>Dleete</Button>
                                    <Button>Done</Button>
                                </div>
                            </Card>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
export 