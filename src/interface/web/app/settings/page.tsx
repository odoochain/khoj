"use client";

import styles from "./settings.module.css";

import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"

import { useUserConfig, ModelOptions } from "../common/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { ArrowRight, ChatCircleText, Key, Palette, SpeakerHigh, UserCircle, FileMagnifyingGlass, Trash, Copy, PlusCircle } from "@phosphor-icons/react";

import NavMenu from "../components/navMenu/navMenu";
import SidePanel from "../components/sidePanel/chatHistorySidePanel";
import Loading from "../components/loading/loading";


interface DropdownComponentProps {
    items: ModelOptions[];
    selected: number;
    callbackFunc: (value: string) => Promise<void>;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ items, selected, callbackFunc }) => {
    const [position, setPosition] = useState(selected?.toString() ?? "0");

    return !!selected && (
        <div className="overflow-hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <Button variant="outline" className="justify-start">
                        {items.find(item => item.id === Number(position))?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                        value={position.toString()}
                        onValueChange={async (value) => { setPosition(value); await callbackFunc(value); }}
                    >
                        {items.map((item) => (
                            <DropdownMenuRadioItem value={item.id.toString()}>
                                {item.name}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

interface TokenObject {
    token: string;
    name: string;
}

export const useApiKeys = () => {
    const [apiKeys, setApiKeys] = useState<TokenObject[]>([]);
    const { toast } = useToast();

    const generateAPIKey = async () => {
        try {
            const response = await fetch(`/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const tokenObj = await response.json();
            setApiKeys(prevKeys => [...prevKeys, tokenObj]);
        } catch (error) {
            console.error('Error generating API key:', error);
        }
    };

    const copyAPIKey = async (token: string) => {
        try {
            await navigator.clipboard.writeText(token);
            toast({
                title: "🔑 API Key",
                description: "Copied to clipboard",
            });
        } catch (error) {
            console.error('Error copying API key:', error);
        }
    };

    const deleteAPIKey = async (token: string) => {
        try {
            const response = await fetch(`/auth/token?token=${token}`, { method: 'DELETE' });
            if (response.ok) {
                setApiKeys(prevKeys => prevKeys.filter(key => key.token !== token));
            }
        } catch (error) {
            console.error('Error deleting API key:', error);
        }
    };

    const listApiKeys = async () => {
        try {
            const response = await fetch(`/auth/token`);
            const tokens = await response.json();
            if (tokens?.length > 0) {
                setApiKeys(tokens);
            }
        } catch (error) {
            console.error('Error listing API keys:', error);
        }
    };

    useEffect(() => {
        listApiKeys();
    }, []);

    return {
        apiKeys,
        generateAPIKey,
        copyAPIKey,
        deleteAPIKey,
    };
};


export default function SettingsView() {
    const [title, setTitle] = useState("Settings");
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const { apiKeys, generateAPIKey, copyAPIKey, deleteAPIKey } = useApiKeys();
    const userConfig = useUserConfig(true);
    const cardClassName = "w-1/3 grid grid-flow-column border border-gray-300 shadow-md rounded-lg";
    const { toast } = useToast();

    useEffect(() => {
        setIsMobileWidth(window.innerWidth < 786);
        const handleResize = () => setIsMobileWidth(window.innerWidth < 786);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updateModel = (name: string) => async (id: string) => {
        try {
            const response = await fetch(`/api/model/${name}?id=` + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const result = await response.json();
                toast({
                    description: `${name} model updated succesfully`,
                });
            } else {
                toast({
                    description: `Failed to update ${name} model`,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error updating search model:', error);
            toast({
                description: `An error occured while updating the ${name} model`,
                variant: "destructive",
            });
        }
    };

    if (!userConfig) return <Loading />;

    return (
        <div id="page" className={styles.page}>
            <title>
                {title}
            </title>
            <div className={styles.sidePanel}>
                <SidePanel
                    webSocketConnected={true}
                    conversationId={null}
                    uploadedFiles={[]}
                    isMobileWidth={isMobileWidth}
                />
            </div>
            <div className={styles.content}>
                <NavMenu selected="Settings" title="Settings" showLogo={true} />
                <div className={styles.contentBody}>
                    <Suspense fallback={<Loading />}>
                        <div id="content" className="grid grid-flow-column gap-16 m-8">
                            <div className="section grid gap-8">
                                <div className="text-4xl">Profile</div>
                                <div className="cards flex flex-wrap gap-16">
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row"><UserCircle className="h-7 w-7 mr-2"/>Name</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            <input type="text" className="w-full border border-gray-300 rounded-lg p-4" defaultValue={userConfig.given_name} />
                                        </CardContent>
                                        <CardFooter className="flex flex-wrap gap-4">
                                            <Button variant="outline" size="sm" className="border-green-400">Save</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                            <div className="section grid gap-8">
                                <div className="text-4xl">Content</div>
                                <div className="cards flex flex-wrap gap-16">
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row">Files</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            Manage your synced files
                                        </CardContent>
                                        <CardFooter className="flex flex-wrap gap-4">
                                            <Button variant="outline" size="sm" className="border-green-400">{userConfig.enabled_content_source.computer ? "Update" : "Setup"} <ArrowRight className="inline ml-2" weight="bold"/></Button>
                                            <Button variant="outline" size="sm" className={`${userConfig.enabled_content_source.computer ? "border-red-400" : "hidden"}`}>Disable</Button>
                                        </CardFooter>
                                    </Card>
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row">Github</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            Set repositories to index
                                        </CardContent>
                                        <CardFooter className="flex flex-wrap gap-4">
                                            <Button variant="outline" size="sm" className="border-green-400">{userConfig.enabled_content_source.github ? "Update" : "Setup"} <ArrowRight className="inline ml-2" weight="bold"/></Button>
                                            <Button variant="outline" size="sm" className={`${userConfig.enabled_content_source.github ? "border-red-400" : "hidden"}`}>Disable</Button>
                                        </CardFooter>
                                    </Card>
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row">Notion</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            Sync your Notion pages
                                        </CardContent>
                                        <CardFooter className="flex flex-wrap gap-4">
                                            <Button variant="outline" size="sm" className="border-green-400">{userConfig.enabled_content_source.notion ? "Update" : "Setup"} <ArrowRight className="inline ml-2" weight="bold"/></Button>
                                            <Button variant="outline" size="sm" className={`${userConfig.enabled_content_source.notion ? "border-red-400" : "hidden"}`}>Disable</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                            <div className="section grid gap-8">
                                <div className="text-4xl">Features</div>
                                <div className="cards flex flex-wrap gap-16">
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row"><ChatCircleText className="h-7 w-7 mr-2"/>Chat</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            <DropdownComponent
                                                items={userConfig.chat_model_options}
                                                selected={userConfig.selected_chat_model_config}
                                                callbackFunc={updateModel("chat")}
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row"><FileMagnifyingGlass className="h-7 w-7 mr-2"/>Search</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            <DropdownComponent
                                                items={userConfig.search_model_options}
                                                selected={userConfig.selected_search_model_config}
                                                callbackFunc={updateModel("search")}
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row"><Palette className="h-7 w-7 mr-2"/>Paint</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            <DropdownComponent
                                                items={userConfig.paint_model_options}
                                                selected={userConfig.selected_paint_model_config}
                                                callbackFunc={updateModel("paint")}
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className={cardClassName}>
                                        <CardHeader className="text-xl flex flex-row"><SpeakerHigh className="h-7 w-7 mr-2"/>Voice</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            <DropdownComponent
                                                items={userConfig.voice_model_options}
                                                selected={userConfig.selected_voice_model_config}
                                                callbackFunc={updateModel("voice")}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="section grid gap-8">
                                <div className="text-4xl">Clients</div>
                                <div className="cards flex flex-wrap gap-16">
                                    <Card className="grid grid-flow-column border border-gray-300 shadow-md rounded-lg">
                                        <CardHeader className="text-xl flex flex-row"><Key className="h-7 w-7 mr-2"/>API Keys</CardHeader>
                                        <CardContent className="overflow-hidden">
                                            <p className="text-md text-gray-400">
                                            Access Khoj from your Desktop App, Obsidian plugin, and more.
                                            </p>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Name</TableHead>
                                                        <TableHead>Token</TableHead>
                                                        <TableHead>Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {apiKeys.map((key) => (
                                                        <TableRow key={key.token}>
                                                            <TableCell><b>{key.name}</b></TableCell>
                                                            <TableCell>{`${key.token.slice(0, 4)}...${key.token.slice(-4)}`}</TableCell>
                                                            <TableCell>
                                                                <Button variant="outline" className="border border-green-400" onClick={() => copyAPIKey(key.token)}>
                                                                    <Copy className="h-4 w-4 mr-2" /><span className="hidden md:inline">Copy</span>
                                                                </Button>
                                                                <Button variant="outline" className="ml-4 border border-red-400" onClick={() => deleteAPIKey(key.token)}>
                                                                    <Trash className='h-4 w-4 mr-2' /><span className="hidden md:inline">Delete</span>
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                        <CardFooter className="flex flex-wrap gap-4">
                                            <Button variant="outline" className="border border-green-300" onClick={generateAPIKey}>
                                                <PlusCircle className='h-4 w-4 mr-2' />Generate Key
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
