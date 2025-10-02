import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  InlineStack,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();

  const { checkout } = useApi();
  const currentStep = getCurrentStep(checkout);


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="checkout-progress-bar" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  function getCurrentStep(checkout) {
  if (checkout?.selectedDeliveryOption) return 3;
  if (checkout?.shippingAddress) return 2;
  return 1;
  }

  // 3. Render a UI
  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      {/* <Banner title="checkout-progress-bar"> */}
        {/* {translate("welcome", {
          target: <Text emphasis="italic">{extension.target}</Text>,
        })} */}
      {/* </Banner> */}
      {/* <Checkbox onChange={onCheckboxChange}>
        {translate("iWouldLikeAFreeGiftWithMyOrder")}
      </Checkbox> */}
        <InlineStack alignment="center" spacing="base" blockAlignment="center" wrap={false}>
          <Text fontWeight={'bolder'} color={'subdued'}>
            פרטים
          </Text>
          <Text>-</Text>
          <Text size="base" fontWeight={currentStep >= 2 ? 'bold' : 'normal'} color={currentStep >= 2 ? 'base' : 'subdued'}>
            משלוח
          </Text>
          <Text>-</Text>
          <Text size="base" fontWeight={currentStep >= 3 ? 'bold' : 'normal'} color={currentStep >= 3 ? 'base' : 'subdued'}>
            תשלום
          </Text>
        </InlineStack>    
    </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: "requestedFreeGift",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
    console.log("applyAttributeChange result", result);
  }
}