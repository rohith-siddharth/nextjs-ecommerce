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
              (()=>{"use strict";!function(e,i){var n={isTestMode:!1},o=[],t=null;e.P39={showPlacement:function(e,i){if(void 0===i&&(i={}),t)return t.showPlacement(e,i);o.push({m:"showPlacement",a:[e,i]})},removePlacement:function(e){if(t)return t.removePlacement(e);o.push({m:"removePlacement",a:[e]})}};var r=i.createElement("script");r.async=!0,r.src="https://storage.googleapis.com/global-assets-personapay-staging/files/pier39sdk.umd.js",r.onload=function(){var i=e.P39SDK;if(i&&"function"==typeof i.initializeSDK)try{if(!(t=i.initializeSDK(n)))return void console.error("SDK initialization failed");for(var r=0;r<o.length;r++){var a=o[r];a&&t[a.m]&&t[a.m].apply(t,a.a)}o.length=0}catch(e){console.error("SDK initialization error:",e)}else console.error("script failed to load")},i.head.appendChild(r)}(window,document)})();
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
