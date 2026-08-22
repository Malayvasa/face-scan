export function HowItWorks() {
  return (
    <ol className="text-muted-foreground list-decimal space-y-3 pl-5 text-sm leading-relaxed">
      <li>
        This page is just a website that asks your browser for the webcam. No
        photos are uploaded. The picture stays on your computer.
      </li>
      <li>
        The site looks at each video frame and drops numbered dots on your
        ears, eyes, brows, nose, lips, and jaw. Those dots are only pixel
        positions — like pins on a map.
      </li>
      <li>
        A pixel is not a millimeter. So you hold a real object we we already know
        the size of, usually a credit card (85.6 mm long). You tap one end,
        then the other. The site divides that known length by the distance
        between those two taps. That number is the ruler for every face
        measurement.
      </li>
      <li>
        Keep the card in the picture and sit about the same distance from the
        camera. Then turn your head three times: left cheek, straight on,
        right cheek. Side views measure ears and jaw. The front view measures
        eyes, brows, nose, lips, and chin.
      </li>
    </ol>
  );
}
