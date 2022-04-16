import { build, defineConfig, IndexHtmlTransformContext, IndexHtmlTransformResult, Plugin } from 'vite'

function HtmlInlinePlugin(): Plugin {
  return {
    name: 'vite-plugin-inline-html',
    apply: 'build',
    transformIndexHtml: {
			enforce: "post",
			transform(html: string, ctx?: IndexHtmlTransformContext): IndexHtmlTransformResult {
        // During "post" stage, ctx.bundle should be exist
        return Object.entries(ctx.bundle ?? {}).reduce((outputHtml, [fileName, bundle]) => 
          bundle.type === 'asset'
          ? outputHtml.replace(
              new RegExp(`<link rel="stylesheet"[^>]*?href="[\./]*${fileName}"[^>]*?>`),
              () => `<style type="text/css">\n${bundle.source}\n</style>`
            )
          : bundle.type === 'chunk'
          ? outputHtml.replace(
              new RegExp(`<script type="module"[^>]*?src="[\./]*${fileName}"[^>]*?></script>`),
              () => `<script type="module">\n//${bundle.fileName}\n${bundle.code}\n</script>`
            )
          : outputHtml,
          html
        )
			},
		},
  }
}

export default defineConfig({
  plugins: [HtmlInlinePlugin()],
  build: {
    write: false,
    minify: 'esbuild'
  }
})
