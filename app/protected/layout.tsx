import StyleLayout from "@/app/style-layout"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <StyleLayout>
            {children}
        </StyleLayout>
    );
}
