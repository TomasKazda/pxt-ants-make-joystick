# Micro:bit RC Extension

Universal RC transmitter and receiver extension for BBC micro:bit. Create wireless remote controls for robots, RC cars, and other projects using joystick modules or the built-in accelerometer.

## Features

- **Dual Mode Transmitter**: Use external joystick module or built-in accelerometer
- **Wireless Communication**: Reliable radio pairing between transmitter and receiver
- **Button Support**: Up to 7 configurable buttons plus logo touch sensor
- **Event-Driven**: Custom event handlers for received data
- **Visual Feedback**: LED matrix display shows joystick direction and button states
- **Customizable**: Configure pins, radio groups, and display images

## Hardware Requirements

### Transmitter (Controller)
- 1x BBC micro:bit
- **Option A**: Joystick module (typically connected to P1, P2)
  - Common joystick expansion boards compatible with micro:bit
  - Analog X/Y axes connected to analog pins
- **Option B**: Use micro:bit's built-in accelerometer (no additional hardware)
- Optional: Push buttons connected to digital pins (P5, P8, P11-P15)

### Receiver
- 1x BBC micro:bit
- Your robot, RC car, or other project device

## Installation

This repository can be added as an **extension** in MakeCode:

1. Open [https://makecode.microbit.org/](https://makecode.microbit.org/)
2. Click on **New Project**
3. Click on **Extensions** under the gearwheel menu
4. Search for **https://www.github.com/microbit-cz/pxt-mcb-rc/** and import

## Quick Start

### Transmitter Code (Controller)

```blocks
// Using external joystick on P1 and P2
mcbRCtx.init(true, AnalogPin.P2, AnalogPin.P1)
mcbRCtx.doPairing()
```

Or for accelerometer mode:
```blocks
// Using built-in accelerometer (tilt to control)
mcbRCtx.init(false)
mcbRCtx.doPairing()
```

### Receiver Code (Robot/Car)

```blocks
// Initialize receiver
mcbRCrx.init()
mcbRCrx.doPairing()

// Handle received data
mcbRCrx.onDataReceived(function(joystick, buttons, image) {
    // Display joystick state
    image.showImage(0)
    
    // Control motors based on joystick
    if (joystick.strength > 20) {
        let speed = joystick.strength
        let direction = joystick.deg
        // Add your motor control code here
    }
    
    // React to button presses
    if (mcbRCrx.isButtonPressed("A")) {
        // Button A pressed - trigger action
    }
})
```

## API Reference

### Transmitter (`mcbRCtx`)

#### `init(usePinInput, pinX, pinY, radioGroup, radioFreq)`
Initialize the RC transmitter.
- `usePinInput`: `true` for joystick module, `false` for accelerometer
- `pinX`: Analog pin for X-axis (default: P2)
- `pinY`: Analog pin for Y-axis (default: P1)
- `radioGroup`: Radio group 1-255 (default: 10)
- `radioFreq`: Radio frequency band 0-83 (default: 66)

#### `doPairing()`
Start pairing process with receiver (shows pitchfork icon, 10s timeout).

#### `getStrength()` → number
Get current joystick strength (0-100).

#### `getDirection()` → number
Get current joystick direction in degrees (0-359).

#### `isPaired()` → boolean
Check if transmitter is paired with a receiver.

### Receiver (`mcbRCrx`)

#### `init(radioGroup, radioFreq)`
Initialize the RC receiver.
- `radioGroup`: Radio group 1-255 (default: 10)
- `radioFreq`: Radio frequency band 0-83 (default: 66)

#### `doPairing()`
Start pairing process with transmitter (shows pitchfork icon, 10s timeout).

#### `onDataReceived(handler)`
Register event handler called when RC data is received.
- `handler`: Function with parameters:
  - `joystick`: Object with `strength` (0-100), `deg` (0-359), `dirArrow` (0-7)
  - `buttons`: Array of button states
  - `image`: Recommended display image

#### `getStrength()` → number
Get current joystick strength (0-100).

#### `getDirection()` → number
Get current joystick direction in degrees (0-359).

#### `getDirectionArrow()` → number
Get direction as arrow (0=right, 2=up, 4=left, 6=down).

#### `isButtonPressed(buttonKey)` → boolean
Check if specific button is pressed (A, B, C, D, E, F, P, L).

## Pairing Process

1. Flash transmitter code to controller micro:bit
2. Flash receiver code to robot/car micro:bit
3. Power on both devices
4. Run `doPairing()` on both (within 10 seconds)
5. When paired, both show happy face icon
6. Pairing is persistent until power cycle or re-pairing

## Troubleshooting

- **Not pairing**: Ensure both use same radio group and frequency
- **Weak signal**: Keep devices within 10-15m range, avoid obstacles
- **Interference**: Try different radio frequency bands (0-83)
- **Joystick calibration**: Calibration happens on `init()` - keep joystick centered

## Advanced Configuration

### Custom Button Mapping
```typescript
mcbRCtx.setPinsMap([
    {key: "A", pin: DigitalPin.P5},
    {key: "B", pin: DigitalPin.P11},
    {key: "C", pin: DigitalPin.P15}
])
```

### Custom Display Images
```typescript
mcbRCrx.setGetImage(function(key: string): Image {
    if (key === "0") return images.arrowImage(ArrowNames.East)
    if (key === "A") return images.iconImage(IconNames.Heart)
    return images.createImage(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
    `)
})
```

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit pull requests or open issues.

---

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
