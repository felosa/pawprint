/**
 * Creates the mock analytics functions.
 */
export const initialiseAnalytics = () => {
  window.page = () => {
    console.log(`Tracked page at pathname: '${window.location.pathname}'`);
  };

  window.trackUser = userId => {
    console.log(`Tracked user ID: ${userId}`);
  };

  window.trackEvent = (name, details) => {
    console.log(`Tracked event named ${name} with these details:`, details);
  };
};

export default initialiseAnalytics;
