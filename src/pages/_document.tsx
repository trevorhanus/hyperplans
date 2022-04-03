import Document, {
    Head,
    Html,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

class PLDocument extends Document {
    render() {
        return (
            <Html className="h-full bg-gray-100">
                <Head>
                    <link rel="shortcut icon" href="/favicon-256.png" />
                </Head>
                <body className="h-full">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default PLDocument;
