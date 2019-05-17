declare let window: {
  frames: any
}

export function testIframeAccessibility(): string[] {
  const errors: string[] = []

  // Try to access the Keeper Extension's iframe
  try {
    const iframeOnWindow = window.frames['keeper-extension'].body
    console.log('iframeOnWindow', iframeOnWindow)
    if (iframeOnWindow === undefined) {
      errors.push(`Able to access the Keeper Extension's iframe on window`)
    }
  } catch (e) {}

  // Try to access arbitrary iframes on window
  const numIframes = window.frames.length
  console.log(`Total # of iframes found: ${numIframes}`)
  for (let i = 0; i < numIframes; i++) {
    // console.log(`trying to access iframe at index ${i}`);
    try {
      const iframeOnWindow = window.frames[i].body
      errors.push(`Able to access arbitrary iframe (index ${i}) on window`)
    } catch (e) {}
  }

  return errors
}
