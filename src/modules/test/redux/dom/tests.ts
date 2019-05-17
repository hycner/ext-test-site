const DOM_NODES = ['keeper-extension']

export function testIframeNodeLeaks(): string[] {
  const errors: string[] = []

  // TODO: there are 2 different setups below. Decide on one

  // Try to select a Keeper iframe's inner DOM nodes
  const iframeDomNode = document.querySelector('keeper-extension')
  if (iframeDomNode) errors.push("Able to see Keeper Extension iframe's inner DOM nodes")

  // Try to select various Keeper iframe's inner DOM nodes
  for (let x of DOM_NODES) {
    const iframeDomNode = document.querySelector(x)
    if (iframeDomNode) errors.push(`Able to see Keeper Extension iframe's inner DOM node: ${x}`)
  }

  return errors
}
