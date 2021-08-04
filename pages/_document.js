// _document.js is for i;njecting extra html into every page if needed
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render () {
        return (
            <Html lang="en">
                <Head></Head>
                <body>
                    <div id="overlays"></div>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}

export default MyDocument