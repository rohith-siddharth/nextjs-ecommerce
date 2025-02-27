import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "@/utils/gtag";

interface DocumentProps extends DocumentInitialProps {
  isProduction: boolean;
}

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    // Check if in production
    const isProduction = process.env.NODE_ENV === "production";

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html lang="en">
        <Head>
          {/* We only want to add the scripts if in production */}
          {isProduction && (
            <>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
          
          {/* Your new SDK script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (()=>{"use strict";!function(e,n){e._p39SDK={commandQueue:[],realSDKInstance:null,config:{storeId:"cdc94fec-19fd-49d9-bc08-a1b7b615f7dd",isTestMode:!1, environment:"development"}},e.P39={showPlacement:function(n){if(void 0===n&&(n={}),e._p39SDK.realSDKInstance)return e._p39SDK.realSDKInstance.showPlacement(n);e._p39SDK.commandQueue.push({method:"showPlacement",args:[n]})},removePlacement:function(){if(e._p39SDK.realSDKInstance)return e._p39SDK.realSDKInstance.removePlacement();e._p39SDK.commandQueue.push({method:"removePlacement",args:[]})}};var a=n.createElement("script");a.async=!0,a.src="https://storage.googleapis.com/global-assets-personapay/assets/files/js/p39sdk-dev.min.js",n.head.appendChild(a)}(window,document)})();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
