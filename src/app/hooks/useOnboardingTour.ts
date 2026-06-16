import { useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function useOnboardingTour() {
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);

  const startTour = () => {
    // Clean up any existing instance
    if (driverRef.current) {
      driverRef.current.destroy();
    }

    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayOpacity: 0.75,
      stagePadding: 10,
      stageRadius: 16,
      allowClose: true,
      nextBtnText: "Next →",
      prevBtnText: "← Back",
      doneBtnText: "Let's go! 🚀",
      popoverClass: "eaglepurse-tour-popover",
      onDestroyed: () => {
        localStorage.removeItem("showTour");
        localStorage.setItem("tourDone", "true");
      },
      steps: [
        {
          // Introductory step — no element target, centred on screen
          popover: {
            title: "👋 Welcome to EaglePurse!",
            description:
              "Let's take a quick tour so you know exactly where everything is. Takes about 30 seconds.",
            side: "over" as any,
            align: "center",
          },
        },
        {
          element: "#nav-home",
          popover: {
            title: "🏠 Dashboard",
            description:
              "Your budget HQ. See how many days of spending money you have left, your burn rate, and smart alerts.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#budget-gauge",
          popover: {
            title: "⏱️ Budget Gauge",
            description:
              "This dial shows how far into your allowance period you are. Green = good, red = nearly out. It also shows your projected broke-day.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#nav-log-expense",
          popover: {
            title: "📝 Log Expense",
            description:
              "Tap here any time you spend money — food, data, transport, printing, anything. Logging keeps your budget accurate.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#nav-meal-plan",
          popover: {
            title: "🍛 Meal Plan",
            description:
              "Get daily meal combos tailored to your exact budget. The app shows what you can afford for breakfast, lunch and dinner — no guessing.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#nav-coach",
          popover: {
            title: "👩🏾 Coach Ngozi",
            description:
              "Your AI budget coach. Ask her anything — she'll give you personalised money advice, and can even auto-adjust your daily limit.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#nav-simulator",
          popover: {
            title: "📊 What-If Simulator",
            description:
              "Curious what happens if you stop buying shawarma or walk instead of taking keke? Try scenarios here and see exactly how many extra days you'll last.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#nav-settings",
          popover: {
            title: "⚙️ Settings",
            description:
              "Update your allowance, feeding budget, dietary preferences, and meal times here any time your situation changes.",
            side: "right",
            align: "start",
          },
        },
        {
          popover: {
            title: "✅ You're all set!",
            description:
              "You now know the full app. You can replay this tour any time from the Settings page. Good luck managing your money!",
            side: "over" as any,
            align: "center",
          },
        },
      ],
    });

    driverRef.current = driverObj;
    driverObj.drive();
  };

  return { startTour };
}
