let running = false

// ---- サーボ制御関数 ----
function forward() {
    pins.servoWritePin(AnalogPin.P13, 0)
    pins.servoWritePin(AnalogPin.P14, 180)
}

function turnRight() {
    // 右停止、左前進
    pins.servoWritePin(AnalogPin.P13, 0)
    pins.servoWritePin(AnalogPin.P14, 90)
}

function turnLeft() {
    // 左停止、右前進
    pins.servoWritePin(AnalogPin.P13, 90)
    pins.servoWritePin(AnalogPin.P14, 180)
}

function stopAll() {
    pins.servoWritePin(AnalogPin.P13, 90)
    pins.servoWritePin(AnalogPin.P14, 90)
}

// ---- ボタン制御 ----
input.onButtonPressed(Button.A, function () {
    running = true
    basic.showNumber(1)  // 走行中：1を表示
})

input.onButtonPressed(Button.B, function () {
    running = false
    stopAll()
    basic.showNumber(0)  // 停止中：0を表示
})

// ---- メインループ ----
basic.forever(function () {
    if (running) {
        let leftSensor = pins.digitalReadPin(DigitalPin.P1)
        let rightSensor = pins.digitalReadPin(DigitalPin.P2)

        if (leftSensor == 1 && rightSensor == 1) {
            // 両方黒：前進
            forward()
        } else if (leftSensor == 0 && rightSensor == 1) {
            // 左が白：右折
            turnRight()
        } else if (leftSensor == 1 && rightSensor == 0) {
            // 右が白：左折
            turnLeft()
        } else {
            // 両方白：停止
            stopAll()
        }
    }
})