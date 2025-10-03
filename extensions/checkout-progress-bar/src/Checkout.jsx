import {
  reactExtension,
  Banner,
  BlockStack,
  Text,
  InlineStack,
  useApi,
  Icon,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";


export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();

  if (!instructions.attributes.canUpdateAttributes) {
    return (
      <Banner title="checkout-progress-bar" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  return (
    <BlockStack padding={"tight"}>
        <InlineStack alignment="center" spacing="base" blockAlignment="center" wrap={false} >
          <Text size="base" fontWeight={'normal'} color={'subdued'}>
            פרטים 
          </Text>
          <Icon size="small" source="chevron-right" />
          <Text size="base" fontWeight={'normal'} color={'subdued'}>
            משלוח
          </Text>
          <Icon size="small" source="chevron-right" />
          <Text size="base" fontWeight={'normal'} color={'subdued'}>
            תשלום
          </Text>
        </InlineStack>    
    </BlockStack>
  );
}