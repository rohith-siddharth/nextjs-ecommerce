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
                    (()=>{"use strict";!function(e,i){var n={storeId:"cdc94fec-19fd-49d9-bc08-a1b7b615f7dd",isTestMode:!1,environment:"development"},o=[],t=null;e.P39={showPlacement:function(e){if(void 0===e&&(e={}),t)return t.showPlacement(e);o.push({m:"showPlacement",a:[e]})},removePlacement:function(){if(t)return t.removePlacement();o.push({m:"removePlacement",a:[]})}};var r=i.createElement("script");r.async=!0,r.src="https://cdn.personapay.ai/assets/files/js/pier39-sdk-script/beta/pier39-sdk.umd.js",r.onload=function(){var i=e.P39SDK;if(i&&"function"==typeof i.initializeSDK)try{if(!(t=i.initializeSDK(n)))return void console.error("SDK initialization failed");for(var r=0;r<o.length;r++){var a=o[r];a&&t[a.m]&&t[a.m].apply(t,a.a)}o.length=0}catch(e){console.error("SDK initialization error:",e)}else console.error("script failed to load")},i.head.appendChild(r)}(window,document)})();
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
