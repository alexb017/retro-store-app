import { Metadata } from 'next';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BannerNewsletter from '@/components/banner-newsletter';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions',
};

const faqData = [
  {
    question: 'How do I track my order?',
    answer:
      "Once your order has shipped, you will receive an email with a tracking number. You can use that number to track your order on the shipping carrier's website.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, and Apple Pay. We also offer financing through Affirm.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of purchase. Items must be in new condition and in their original packaging. Please contact us to initiate a return.',
  },
  {
    question: 'Do you offer gift cards?',
    answer:
      'Yes, we offer gift cards in various denominations. Gift cards are delivered by email and contain instructions to redeem them at checkout.',
  },
  {
    question: 'How can I contact customer support?',
    answer:
      'You can contact customer support by phone at 1-800-555-5555 or by email at retrostore@gmail.com',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we offer international shipping to most countries. Shipping rates and delivery times vary depending on the destination.',
  },
];

export default function Faq() {
  return (
    <div className="flex flex-col gap-12 p-5 pt-12">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                FAQ
              </h1>
              <div>
                <h4 className="text-xl tracking-tight">
                  Have a question? We have answers.
                </h4>
                <h4 className="text-xl tracking-tight">
                  Check out our frequently asked questions.
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {faqData.map((faq, index) => (
                <Accordion key={index} collapsible type="single">
                  <AccordionItem value={faq.question}>
                    <AccordionTrigger>
                      <h4 className="text-xl font-semibold tracking-tight text-left">
                        {faq.question}
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent>
                      <h4 className="text-xl tracking-tight">{faq.answer}</h4>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BannerNewsletter />
      <Footer />
    </div>
  );
}
