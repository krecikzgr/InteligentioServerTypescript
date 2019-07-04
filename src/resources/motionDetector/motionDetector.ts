interface MotionDetector {
    enable(bool): void;
    setActivityInterval(start: Date, stop: Date): void;
    disableTill(dueDate: Date): void;
}
