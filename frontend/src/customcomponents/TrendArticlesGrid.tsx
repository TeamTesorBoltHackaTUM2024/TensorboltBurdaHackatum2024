import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Author {
  name: string;
}

interface MediaContent {
  medium: string;
  url: string;
}

interface ExtractedData {
  summary: string;
  keywords: string[];
  facts: string[];
  important_dates: Record<string, string>;
}

interface ExistingArticle {
  title: string;
  rss_summary: string;
  link: string;
  id: string;
  authors: Author[];
  published: string;
  published_parsed: number[];
  media_content: MediaContent[];
  content: string;
  extracted_data: ExtractedData;
}

export function TrendArticlesGrid() {
  const [existingArticles, setExistingArticles] = useState<ExistingArticle[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commenting out the axios request and using mock data
    setLoading(true);
    setTimeout(() => {
      const mockExistingArticles: ExistingArticle[] = [
        {
          title:
            "'Accident waiting to happen' on A46 as sudden speed limit change slammed",
          rss_summary:
            '<div><img src="https://i2-prod.coventrytelegraph.net/incoming/article30365320.ece/ALTERNATES/s1200/0_A46-blanked-plates.jpg" style="width: 100%;" /><div>Coventry Live readers have been sharing their views on speed limits as the A46 from the M6, as after the Binley flyover, the speed limit suddenly drops from 70 to 50</div></div>',
          link: "https://www.coventrytelegraph.net/news/news-opinion/accident-waiting-happen-major-coventry-30407900",
          id: "36bafb25227b1a0bdfd8a4e15b291eb5",
          authors: [
            {
              name: "Coventry Live readers",
            },
          ],
          published: "Sat, 23 Nov 2024 05:00:00 GMT",
          published_parsed: [2024, 11, 23, 5, 0, 0, 5, 328, 0],
          media_content: [
            {
              medium: "image",
              url: "https://i2-prod.coventrytelegraph.net/incoming/article30365320.ece/ALTERNATES/s1200/0_A46-blanked-plates.jpg",
            },
          ],
          content:
            'Our free email updates are the best way to get headlines direct to your inbox\n\nOur free email updates are the best way to get headlines direct to your inbox\n\nCoventry Live readers have offered up mixed opinions on the A46\'s erratic speed limit from the M6 leading into Coventry. Indeed, as our own Conor Knell discovered during a test drive, the abrupt plunge from 70 to a 50 mph restriction is a reliable giveaway of who’s local and who’s not.\n\nNewcomers, he found, slam on their brakes in anticipation of imminent speed cameras while regulars steam on by, treating the legal limits as mere guidelines. It seems worlds away from Coventry\'s rigorous streets where a host of average speed cameras rigorously enforce motoring discipline.\n\nCoventry motorists opened up about their experiences, with Conan the Mermaid reflecting: "All the cars that I have driven in my 70+ years show the speed to be approximately 10% greater than the actual. This means when you think you are doing 50, you\'re doing only 45. Thus the glares from the impatient others. Hope this helps."\n\nREAD MORE: Tribute to \'devoted\' dad in Coventry\'s death and funeral notices this week\n\nPERCY adds: "Yep driven down there and all cars pass me. We need average speed cameras on as many roads as possible. The difference is noticeable straight away, .and all you who hate them, carry on speeding, pay your fine then we\'ll get more cameras, win win."\n\nMxlerone writes: "What\'s weird is that when they were building the new tollbar roundabout and flyover, that 50mph section had average speed cameras put in place and everything worked fine (or you received a fine). For some reason it must have been decided to allow the road to descend into anarchy through their removal instead."\n\nKenpas says: "The reason the speed limit is 50mph on that part of the A46/A45, is the bend under the Toll Bar junction, as speeding vehicles are in danger of overturning under the junction. Also there is parking places built along that stretch for the mobile speed cameras to park up. I haven\'t seen any mobile cameras on it yet!!"\n\nDisorganised1 adds: "Just drive around the ring road. I get overtaken daily driving at the speed limit, and on both sides of the car - often by private hire cars."\n\nMikehf comments: "Never have any problem sticking to the speed limit."\n\nDestroyedcountry believes: "Oh dear, anyone with a inch of common sense would never have set the speed limits as they are!"\n\nOver on our Facebook page - Belle Barnes says: "Excellent point and I don’t know why it’s not been called out before. I regularly drive on that road and I too follow the speed limit signs. They are there for a reason so when you feel like your the one in the wrong, the truth is that everyone else driving at 60/70 mph are in the wrong. I agree, it’s an accident waiting to happen. Maybe this article will make the highways agency or whoever deals with our roads, sort it out once and for all."\n\nWhile Saucey Sue adds: "The 50mph stretch is round by the jaguar and A444/Warwick bypass where there are multiple lanes for different places, similar to the picture of the article above, as well as slip roads joining. It’s by far safer to reduce the speed limit than having everyone trying to achieve national speed limit whilst also trying to be in the correct lane. I guarantee there’d be people screaming about the number of accidents if the speed limit was 70. And remember people, a speed limit is not a target, it’s a maximum speed allowed."\n\nVicki Walls-Gilbert thinks: "Well if you’re driving to the letter of the law you’ll be in the left hand lane and not be holding up anyone who wishes to speed as you’ll pull over as soon as you’ve over taken. Which leaves a lane free for the speedsters! You will also not travel in the right hand lane for miles, not over taking anything, often travelling way below the speed limit simply because you haven’t got the balls to change into the right hand lane as you approach your junction to turn right."\n\nSo do you believe that the limit is correct? Let us know HERE or in the comments below.',
          extracted_data: {
            summary:
              "Coventry Live readers express mixed opinions on the A46's speed limit, which drops from 70 to 50 mph near Coventry. Locals often ignore the limit, while newcomers brake for speed cameras. Some readers suggest more average speed cameras to enforce limits, while others argue the current limits are necessary for safety due to road conditions. The debate continues on social media, with some advocating for stricter enforcement and others questioning the logic behind the speed limits.",
            keywords: [
              "A46 speed limit",
              "Coventry",
              "average speed cameras",
              "road safety",
              "speed enforcement",
            ],
            facts: [
              "The A46 speed limit drops from 70 mph to 50 mph near Coventry.",
              "Locals often ignore the speed limit, while newcomers brake for speed cameras.",
              "Some readers suggest installing more average speed cameras.",
              "The speed limit is 50 mph due to a bend under the Toll Bar junction.",
              "There are parking places for mobile speed cameras along the A46.",
            ],
            important_dates: {},
          },
        },
        {
          title: "2025 BMW F 900 R and F 900 XR Preview",
          rss_summary:
            '<div><img src="https://ridermagazine.com/wp-content/uploads/2024/11/2025-BMW-F-900-R-Preview-4.jpg" style="width: 100%;" /><div>The BMW F 900 R roadster and F 900 XR sport-tourer are updated for 2025 with changes to ergonomics, suspension, rider aids, and equipment.</div></div>',
          link: "https://ridermagazine.com/2024/11/22/2025-bmw-f-900-r-and-f-900-xr-preview/",
          id: "f4b1afa6f6605d2cea6d01d090c64b2a",
          authors: [
            {
              name: "The Staff",
            },
          ],
          published: "Fri, 22 Nov 2024 23:07:07 GMT",
          published_parsed: [2024, 11, 22, 23, 7, 7, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://ridermagazine.com/wp-content/uploads/2024/11/2025-BMW-F-900-R-Preview-4.jpg",
            },
          ],
          content:
            "2025 BMW F 900 R in Style Sport\n\nUpdates for 2025 have been announced for the BMW F 900 R roadster and BMW F 900 XR sport-tourer. Changes include ergonomics, suspension, wheels, battery, and rider aids, and some previously optional equipment is now included as standard.\n\n2025 BMW F 900 XR Racing Red\n\nPowering both models is the returning 895cc parallel-Twin, which produces a claimed 105 hp and 686 lb-ft of torque. Both bikes come with standard Rain and Road riding modes, and the optional Dynamic riding mode has been revised for 2025 for a more direct throttle response. Both bikes will now feature standard Dynamic Traction Control, which can be switched off. Both bikes also receive a new battery, which is 1.7 lb lighter than before.\n\nRelated: BMW F 900 R and F 900 XR Review\n\nIn addition to DTC, the BMW F 900 R and XR will also now come with MSR Engine Drag Torque Control and cornering BMW Motorrad ABS Pro. Dynamic Brake Control, which prevents unintentional acceleration while braking, is also standard for 2025.\n\nThe XR’s handguards are fitted as standard equipment.\n\nSuspension is upgraded on both bikes with a now fully adjustable 43mm inverted telescopic fork. On the R, the new fork provides 5.3 inches of travel, while on the XR travel is 6.7 inches. Adopted from the S 1000 R model, which has already received updates for 2025, are new 17-inch cast-aluminum wheels, which weigh 3.9 lb less than the previous wheels.\n\nBoth bikes receive new 17-inch cast-aluminum wheels and a new fully adjustable 43mm inverted telescopic fork.\n\nThe F 900 R roadster gets new ergonomics for 2025. The handlebar is farther forward and the footpegs are farther back, creating a sportier, forward-leaning riding position.\n\nThe F 900 R’s handlebar is positioned farther forward than before.\n\nThe BMW F 900 XR sport-tourer gets new features as well. It now includes Headlight Pro with an adaptive headlight, as well as a USB-C charging port and heated grips as standard. The windscreen has been redesigned to reduce wind pressure and helmet buffeting.\n\nThe XR gets an updated windscreen for 2025.\n\nThe 2025 BMW F 900 R will be available in Snapper Rocks Blue Metallic as standard. The 2025 BMW F 900 XR will be available in Racing Red as standard. Both bikes will also be available in optional Style Triple Black or Style Sport.\n\n2025 BMW F 900 R in Snapper Rocks Blue Metallic\n\nPricing has not yet been announced.\n\nVisit the BMW Motorrad website for more information.\n\nCheck out more new bikes in Rider’s 2025 Motorcycle Buyers Guide",
          extracted_data: {
            summary:
              "The 2025 BMW F 900 R and F 900 XR models have received updates including improved ergonomics, suspension, wheels, battery, and rider aids. Both models are powered by an 895cc parallel-Twin engine with 105 hp and 686 lb-ft of torque. Standard features now include Dynamic Traction Control, MSR Engine Drag Torque Control, and cornering BMW Motorrad ABS Pro. The F 900 R has a sportier riding position, while the F 900 XR includes Headlight Pro, a USB-C port, and heated grips. Both models feature new 17-inch cast-aluminum wheels and a fully adjustable 43mm inverted telescopic fork. Pricing is yet to be announced.",
            keywords: [
              "BMW F 900 R",
              "BMW F 900 XR",
              "2025 updates",
              "Dynamic Traction Control",
              "MSR Engine Drag Torque Control",
              "BMW Motorrad ABS Pro",
              "ergonomics",
              "suspension",
              "17-inch cast-aluminum wheels",
            ],
            facts: [
              "The 2025 BMW F 900 R and F 900 XR have updated ergonomics, suspension, wheels, battery, and rider aids.",
              "Both models are powered by an 895cc parallel-Twin engine producing 105 hp and 686 lb-ft of torque.",
              "Standard features include Dynamic Traction Control, MSR Engine Drag Torque Control, and cornering BMW Motorrad ABS Pro.",
              "The F 900 R has a sportier riding position with the handlebar farther forward and footpegs farther back.",
              "The F 900 XR includes Headlight Pro, a USB-C port, and heated grips as standard.",
              "Both models have new 17-inch cast-aluminum wheels and a fully adjustable 43mm inverted telescopic fork.",
            ],
            important_dates: {},
          },
        },
        {
          title: "Elon Musk Gets a Crash Course in How Trumpworld Works",
          rss_summary:
            '<div><img src="https://static01.nyt.com/images/2024/11/22/multimedia/22pol-musk-memo-wcjz/22pol-musk-memo-wcjz-videoSixteenByNine3000.jpg" style="width: 100%;" /><div>The world’s richest person, not known for his humility, is still learning the cutthroat courtier politics of Donald Trump’s inner circle — and his ultimate influence remains an open question.</div></div>',
          link: "https://www.nytimes.com/2024/11/22/us/politics/elon-musk-trump.html",
          id: "acae5d1299188857aaad5bc083a5c521",
          authors: [
            {
              name: "Theodore Schleifer",
            },
          ],
          published: "Fri, 22 Nov 2024 16:39:19 GMT",
          published_parsed: [2024, 11, 22, 16, 39, 19, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://static01.nyt.com/images/2024/11/22/multimedia/22pol-musk-memo-wcjz/22pol-musk-memo-wcjz-videoSixteenByNine3000.jpg",
            },
          ],
          content:
            "For the first 53 years of his life, Elon Musk barely spent any time with Donald J. Trump. Then, beginning on the night of Nov. 5, he spent basically no time without him.\n\nAnd so Mr. Musk, more than any other key player in the presidential transition, finds himself in a cram session to learn the courtier politics of Mr. Trump’s inner circle. For the world’s richest person — not known for his humility or patience — it is a social engineering challenge far trickier and less familiar than heavy manufacturing or rocket science.\n\nDoubts abound as to whether he will graduate in 2028 with a four-year degree in Trumpism: It is now a parlor game in Washington and Silicon Valley to speculate just how long the Musk-Trump relationship will last. The answer, as discarded aides from Mr. Trump’s first term will tell you, may depend on Mr. Musk’s ability to placate the boss and keep a relatively low profile — but also to shiv a rival when the time comes.",
          extracted_data: {
            summary:
              "Elon Musk, who had little interaction with Donald Trump for most of his life, is now closely involved with him, especially since November 5. Musk is navigating the complex dynamics of Trump's inner circle, which is a new challenge for him. There is speculation about how long Musk's relationship with Trump will last, with some suggesting it depends on Musk's ability to manage his profile and handle rivals.",
            keywords: [
              "Elon Musk",
              "Donald Trump",
              "Trump's inner circle",
              "relationship",
              "speculation",
            ],
            facts: [
              "Elon Musk had minimal interaction with Donald Trump for the first 53 years of his life.",
              "Since November 5, Elon Musk has been closely involved with Donald Trump.",
              "Musk is learning the dynamics of Trump's inner circle, which is a new challenge for him.",
              "There is speculation about the longevity of Musk's relationship with Trump.",
            ],
            important_dates: {
              "November 5":
                "Elon Musk began closely interacting with Donald Trump.",
            },
          },
        },
        {
          title:
            "Electric shock: carmakers battle strict UK electric car rules as big fines loom",
          rss_summary:
            '<div><img src="https://i.guim.co.uk/img/media/22cd517f82fa9735532b952332c10847e7e27a08/0_187_4421_2652/master/4421.jpg?width=1200&amp;height=630&amp;quality=85&amp;auto=format&amp;fit=crop&amp;overlay-align=bottom%2Cleft&amp;overlay-width=100p&amp;overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&amp;s=add445af32a5aa7f953f0c6622906aff" style="width: 100%;" /><div>As Ford announced cutting 800 UK jobs it said rules forcing companies to sell more EVs each year are ‘unworkable’</div></div>',
          link: "https://www.theguardian.com/environment/2024/nov/22/electric-shock-carmakers-battle-strict-uk-electric-car-rules-as-big-fines-loom",
          id: "f1ed5b6235e9d11d1e58842e01434fb7",
          authors: [
            {
              name: "Jasper Jolly",
            },
          ],
          published: "Fri, 22 Nov 2024 16:35:32 GMT",
          published_parsed: [2024, 11, 22, 16, 35, 32, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://i.guim.co.uk/img/media/22cd517f82fa9735532b952332c10847e7e27a08/0_187_4421_2652/master/4421.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=add445af32a5aa7f953f0c6622906aff",
            },
          ],
          content:
            "When Ford announced this week that it was cutting 800 jobs in the UK, the US carmaker also had stern words for the government. It has joined in a chorus of criticism of rules that force car companies to sell more electric vehicles each year. The rules, known as the zero-emission vehicle (ZEV) mandate, are simply “unworkable”, Ford said.\n\nSomeone should have told Ford back in 2022, when the carmaker strongly backed the policy. In fact, it went further, calling for the British government to force carmakers to sell even more electric cars each year.\n\n“Ford believes that figures lower than Department for Transport’s current proposed trajectory will not send a strong enough signal to customers, manufacturers and investors to spur the appropriate transition,” it said at the time. “Furthermore, any lowering of targets will send the wrong signal in terms of charging infrastructure rollout.”\n\nThe carmaker did argue that the policy should be subject to review if industry conditions change, according to the government consultation response obtained by the Fast Charge newsletter. But the dramatic shift in its position nevertheless illustrates how the industry has been caught out by the slowing growth in demand for electric cars.\n\nDuring the chaos of the coronavirus pandemic – with interest rates at rock bottom – carmakers found that they could sell all the cars they could make (albeit amid problems in getting parts). That has changed now. Carmakers are not experiencing the expected demand for electric cars, with a resurgence instead in sales of hybrids that combine a petrol engine with a smaller battery.\n\nDemand for electric cars has been hit by concerns over public charger numbers, as well as a political backlash (veering into full-on culture war) from critics of net zero carbon policies who argue they are too expensive. Battery cars remain more expensive upfront (even if much cheaper in the long run) despite manufacturers being forced into steep discounts that they argue are unsustainable.\n\nThe carmakers have launched a rearguard lobbying effort to persuade the UK government to relax the mandate, but now find themselves pitted against car charger companies, fleet owners and environmental campaigners who argue that climate targets and billions of pounds of investments will be under threat if the UK government backtracks.\n\nUnder the mandate, electric cars must make up 22% of sales of new vehicles this year, rising to 28% in 2025 – albeit with important loopholes that can reduce the target considerably. If they miss their targets, carmakers face fines of up to £15,000 for each vehicle. No carmakers publicly argue with the goal of 80% battery electric cars by 2030, before a complete ban on new petrol and diesel engines in 2035.\n\nThe mandate is sure to be a key focus for the Society of Motor Manufacturers and Traders (SMMT) when the lobby group’s members convene on Tuesday evening at its annual black tie dinner. Executives at a hotel on Park Lane in London will expect to be ribbed by the host, comedian and TV presenter Tom Allen.\n\nFor the industry, the ZEV mandate is no laughing matter. After months of requests, on Wednesday several carmakers met the transport secretary, Louise Haigh, and business secretary, Jonathan Reynolds, in London to plead for more leeway.\n\nView image in fullscreen In 2022, Ford called for a higher rate of electric car sales under the ZEV mandate, as this screenshot of its consultation response shows. It has since changed course. Photograph: Ford; Department for Transport; The Fast Charge\n\nThe Japanese manufacturer Nissan, which runs the UK’s largest car factory at Sunderland, said the mandate was threatening “the viability of thousands of jobs and billions of pounds in investment” – even if industry insiders think it unrealistic that the company would really abandon the plant. Stellantis, the owner of the Vauxhall, Peugeot and Citroën brands, claimed in the summer that it could close van plants in Ellesmere Port and Luton because of the mandate.\n\nYet carmakers are not the only group claiming that billions of pounds are on the line. Companies are racing to install the chargers that electric cars require.\n\nVicky Read, the chief executive of Charge UK, a lobby group, was also in the room with ministers. She said there is £6bn of lined-up investment predicated on the ZEV mandate. Flip-flopping – as with Conservative prime minister Rishi Sunak’s decision to delay the ban on new petrol cars by five years – damages investment, she said.\n\n“We must not make the same mistake again,” she said. “Anything that leads to fewer fully electric vehicles on UK roads is a no-go for us because it means fewer customers.”\n\nskip past newsletter promotion Sign up to Business Today Free daily newsletter Get set for the working day – we'll point you to all the business news and analysis you need every morning Enter your email address Sign up Privacy Notice: Newsletters may contain info about charities, online ads, and content funded by outside parties. For more information see our Newsletters may contain info about charities, online ads, and content funded by outside parties. For more information see our Privacy Policy . We use Google reCaptcha to protect our website and the Google Privacy Policy and Terms of Service apply. after newsletter promotion\n\nIt is tricky to work out how much pressure individual carmakers are actually under. The headline target is 22% of electric car sales, but in reality they can earn “credits” that lower it. Those credits include lowering the average emissions of their new petrol cars, and “borrowing” excess electric cars made in later years. Another option is buying credits from other brands (although the British industry bristles at the thought of subsidising rivals such as China’s BYD or the US’s Tesla).\n\nWith all the loopholes, the thinktank New AutoMotive has calculated that the real target for 2022 is 18.1% – right in line with the 18.1% electric sales achieved in the first 10 months of 2024. The SMMT disputes those calculations, pointing to disparities between its sales figures and the thinktank’s, although it has not come up with an estimate.\n\nBen Nelmes, the New AutoMotive chief executive, said there is “a high level of uncertainty, and the target could reduce more, or less, depending on the decisions taken by the manufacturers”. Nevertheless, he said that if current trends are maintained it is realistic to think the real target for 2025 could be between 24% and 25% – rather than the headline of 28%.\n\nCarmakers are now arguing for more of those handy “flexibilities”. Ideas presented to ministers this week included allowing carmakers to comply if they overachieve on targets in later years, and giving extra credits to electric cars made in Britain – a policy that could be attractive given the political importance of maintaining UK jobs.\n\nThe business department is thought to be open to relaxing the rules, but industry has so far found the transport department less responsive to its entreaties as it keeps its eye on climate goals.\n\nColin Walker, the head of transport at the Energy & Climate Intelligence Unit, a campaign group, argued that the mandate is working and is good for British consumers.\n\n“The mandate is incentivising manufacturers to compete on price, and as prices come down, sales are going up, with more than one in five new cars sold in the UK being an EV in the last three months,” he said.\n\nWhatever happens, the industry is unlikely to let up the pressure on the government, given jobs cuts, falling profits, and steep investment needs around the world. It is likely that some of them will face fines with the rules as they are.\n\nDavid Bailey, the professor of business economics at the University of Birmingham, said he believed that more flexibilities are warranted. “The ramp-up is really quite severe,” he said. “I think companies will struggle to hit that.”",
          extracted_data: {
            summary:
              "Ford has criticized the UK's zero-emission vehicle (ZEV) mandate, which requires carmakers to sell more electric vehicles annually, calling it \"unworkable.\" This marks a shift from 2022 when Ford supported the policy. The change highlights the industry's struggle with slowing electric car demand, partly due to public charger concerns and political backlash against net-zero policies. The mandate requires 22% of new car sales to be electric in 2023, rising to 28% by 2025, with fines for non-compliance. Carmakers are lobbying for more flexibility, while charger companies and environmentalists warn against policy relaxation. The UK government is under pressure to balance industry needs with climate goals.",
            keywords: [
              "Ford",
              "zero-emission vehicle mandate",
              "electric vehicles",
              "UK government",
              "carmakers",
              "electric car demand",
              "public chargers",
              "net-zero policies",
              "ZEV mandate",
              "climate goals",
            ],
            facts: [
              'Ford criticized the UK\'s zero-emission vehicle (ZEV) mandate as "unworkable."',
              "In 2022, Ford supported the ZEV mandate and called for higher electric car sales targets.",
              "The ZEV mandate requires 22% of new car sales to be electric in 2023, rising to 28% by 2025.",
              "Carmakers face fines of up to £15,000 per vehicle for missing ZEV targets.",
              "Demand for electric cars is slowing due to public charger concerns and political backlash.",
              "Carmakers are lobbying the UK government for more flexibility in the ZEV mandate.",
              "Charger companies and environmentalists warn against relaxing the ZEV mandate.",
              "The UK government is balancing industry needs with climate goals.",
            ],
            important_dates: {
              "2022":
                "Ford supported the ZEV mandate and called for higher electric car sales targets.",
              "2023":
                "The ZEV mandate requires 22% of new car sales to be electric.",
            },
          },
        },
        {
          title:
            "Jeff Bezos’ $500 million superyacht spotted sailing for the first time in a spectacle everyone was waiting for",
          rss_summary:
            '<div><img src="https://supercarblondie.com/wp-content/uploads/Jeff-Bezos-500M-superyacht-sets-sails-for-the-first-time-in-a-while.webp" style="width: 100%;" /><div>Amazon founder Jeff Bezos\' $500 million superyacht spotted sailing in the Bay of Palma - Known as Koru, it\'s one of the world’s most prestigious superyachts</div></div>',
          link: "https://supercarblondie.com/jeff-bezos-500m-superyacht-spotted-sailing-with-all-masts/",
          id: "b805e46d10f9668c3d211a22f96817c0",
          authors: [
            {
              name: "@NalinRawat",
            },
          ],
          published: "Fri, 22 Nov 2024 16:09:26 GMT",
          published_parsed: [2024, 11, 22, 16, 9, 26, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://supercarblondie.com/wp-content/uploads/Jeff-Bezos-500M-superyacht-sets-sails-for-the-first-time-in-a-while.webp",
            },
          ],
          content:
            "Amazon founder Jeff Bezos’ $500 million superyacht was just spotted sailing in the Bay of Palma, Mallorca.\n\nKnown as Koru, the sea vessel is one of the world’s most prestigious superyachts.\n\nUnlike other modern sea vessels, Bezos’s Koru is a three-masted sailing yacht, which makes it stand out from the rest.\n\nWhen commissioned, it was the second-largest sailing yacht in the world.\n\nDISCOVER SBX CARS: The global premium car auction platform powered by Supercar Blondie\n\nJeff Bezos’ $500M superyacht sets sail\n\nThe superyacht recently arrived in the Bay of Palma and spent a few days cruising in Mallorcan waters.\n\nThe last time the yacht came to Palma was two years ago on her maiden voyage.\n\nSail Trip Mallorca\n\nBack then, both Jeff Bezos and his girlfriend, Lauren Sanchez arrived on the Spanish island by private jet.\n\nThey then took a helicopter to Koru’s support ship, the Abeona, and then a fast launch to the mega-yacht.\n\nSpeaking of the $75 million support vessel, it offers additional crew accommodation, a helipad, and storage for supplies.\n\nThe couple also spent a few days cruising in Mallorcan waters before heading to the South of France where they got engaged.\n\nWhy is it out on the sea?\n\nIt is unclear whether Bezos or Sanchez are onboard during this voyage of the Koru.\n\nIt is highly likely that the crew is just performing routine trials on her equipment.\n\nThe annual cost to maintain a superyacht and its support vessel doesn’t come cheap, either.\n\nThe Koru and her support vessel Abeona cost approximately $25 million and $10 million per year.\n\nSail Trip Mallorca\n\nBuilt in the Netherlands by Oceanco, the three-masted superyacht is 127 meters long.\n\nIt is reported to have cost $500 million, but for Jeff Bezos, that may as well be pocket change.",
          extracted_data: {
            summary:
              "Jeff Bezos' $500 million superyacht, Koru, was recently seen sailing in the Bay of Palma, Mallorca. Koru is a three-masted sailing yacht, making it one of the world's most prestigious and the second-largest sailing yacht when commissioned. The yacht, built by Oceanco in the Netherlands, is 127 meters long. It is accompanied by a $75 million support vessel, Abeona, which provides additional crew accommodation and a helipad. The annual maintenance cost for both vessels is approximately $35 million. It is unclear if Bezos or his girlfriend, Lauren Sanchez, are onboard during this voyage, which is likely a routine equipment trial.",
            keywords: [
              "Jeff Bezos",
              "Koru",
              "superyacht",
              "Bay of Palma",
              "Mallorca",
              "Oceanco",
              "Abeona",
              "sailing yacht",
            ],
            facts: [
              "Jeff Bezos' superyacht Koru is valued at $500 million.",
              "Koru is a three-masted sailing yacht, making it unique among modern vessels.",
              "The yacht was built by Oceanco in the Netherlands and is 127 meters long.",
              "Koru was the second-largest sailing yacht in the world when commissioned.",
              "The support vessel Abeona costs $75 million and includes a helipad.",
              "Annual maintenance for Koru and Abeona is approximately $35 million.",
            ],
            important_dates: {
              "two years ago": "Koru made its maiden voyage to Palma.",
            },
          },
        },
        {
          title:
            "Nissan warns of emergency as car brands scramble to meet electric car targets or risk 'irreversible impact'",
          rss_summary:
            '<div><div style="width: 100%; height: 0; padding-bottom: 56.25%;"></div></div>',
          link: "https://www.gbnews.com/lifestyle/cars/nissan-warning-emergency-electric-vehicle-target-impact",
          id: "72c819eded7dde49f08070ff43f448b3",
          authors: [
            {
              name: "Felix Reeves",
            },
          ],
          published: "Fri, 22 Nov 2024 15:07:52 GMT",
          published_parsed: [2024, 11, 22, 15, 7, 52, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://www.gbnews.com/media-library/watch-rishi-sunak-on-nissan-s-ps2billion-investment-in-its-sunderland-factory.jpg?id=54968008&width=1200&height=600&coordinates=0%2C501%2C0%2C438",
            },
          ],
          content:
            "Nissan has issued an urgent call for the UK Government to revise the Zero Emission Vehicle (ZEV) mandate rules, warning that manufacturers face significant penalties due to slower-than-expected electric vehicle sales.\n\nThe Japanese automaker, which operates Britain's largest car manufacturing plant in Sunderland, argues that outdated targets could force manufacturers to pay substantial fines or purchase credits from EV-only brands that don't manufacture in the UK.\n\nThe move comes as consumer demand for electric vehicles has failed to meet projected growth rates, putting pressure on car manufacturers to meet ambitious Government targets. This situation risks undermining UK automotive manufacturing and could threaten thousands of jobs and billions in investment, Nissan stated. Do you have a story you'd like to share? Get in touch by emailingmotoring@gbnews.uk\n\nNissan warned the Zero Emission Vehicle mandate could devastate manufacturers PA\n\nAccording to the Society of Motor Manufacturers and Traders (SMMT), electric vehicle sales are projected to reach just 18.5 per cent of the total market this year. This falls significantly short of the ZEV mandate's 22 per cent target for 2024, with requirements set to increase further to 28 per cent in 2025. Targets will continue to rise in the coming years, with brands required to have 80 per cent of sales come from zero emission vehicles by 2030 and 100 per cent by 2035. Manufacturers have already attempted to boost sales through discounting measures, but consumer demand has remained below expectations.\n\nMissing these targets could result in manufacturers facing substantial penalties worth £15,000 per polluting vehicle over the threshold unless they purchase credits from EV-only brands. Nissan warned that since many EV-only manufacturers do not produce vehicles in the UK, British automotive companies would effectively be subsidising electric vehicle sectors in other countries. In response to these challenges, Nissan has proposed specific changes to the ZEV Mandate, including increased flexibility in borrowing credits from future years in the short term. The manufacturer also wants a two-year monitoring period for 2024 and 2025, replacing potential fines that could devastate the industry.\n\nGuillaume Cartier, Chairperson for the Nissan Africa, Middle East, India, Europe and Oceania (AMIEO) region, said: \"Nissan has consistently supported the aims of the UK’s ZEV mandate and have been working with Governments and partners towards a fully electric future since the first Nissan LEAF arrived in 2010. \"The mandate risks undermining the business case for manufacturing cars in the UK, and the viability of thousands of jobs and billions of pounds in investment. \"We now need to see urgent action from the Government by the end of the year to avoid a potentially irreversible impact on the UK automotive sector.\" Cartier added that it was committed to working with the Government and industry partners to achieve goals, adding that there was an \"urgent need\" to protect the sector. LATEST DEVELOPMENTS: DVLA slammed for 'lack of progress' to help motorists after major update - 'Doesn't go far enough'\n\nMajor British car brand ditches electric vehicle target in favour of hybrids and 'range-extended' models\n\nMotorway traffic chaos: M62 blocked as icy roads cause 'a number of collisions' - 'Please slow down!'\n\nNISSAN",
          extracted_data: {
            summary:
              "Nissan has urged the UK Government to revise the Zero Emission Vehicle (ZEV) mandate rules, citing slower-than-expected electric vehicle sales and the risk of significant penalties for manufacturers. The current targets could force manufacturers to pay fines or buy credits from EV-only brands, potentially undermining UK automotive manufacturing and threatening jobs and investments. Nissan proposes changes to the ZEV Mandate, including more flexibility in credit borrowing and a monitoring period to replace fines. The company emphasizes the need for urgent government action to protect the sector.",
            keywords: [
              "Nissan",
              "Zero Emission Vehicle mandate",
              "electric vehicle sales",
              "UK automotive manufacturing",
              "penalties",
              "credits",
              "investment",
              "jobs",
              "government action",
            ],
            facts: [
              "Nissan has called for a revision of the UK's ZEV mandate rules.",
              "Electric vehicle sales are projected to reach 18.5% of the market this year, below the 22% target for 2024.",
              "Manufacturers face penalties of £15,000 per polluting vehicle over the threshold.",
              "Nissan proposes increased flexibility in borrowing credits and a two-year monitoring period for 2024 and 2025.",
            ],
            important_dates: {
              "2024": "ZEV mandate target of 22% for electric vehicle sales.",
              "2025":
                "ZEV mandate target increases to 28% for electric vehicle sales.",
              "2030": "80% of sales required to be zero emission vehicles.",
              "2035": "100% of sales required to be zero emission vehicles.",
            },
          },
        },
        {
          title: "How electric car apathy brought down Europe’s battery giant",
          rss_summary:
            '<div><img src="https://www.telegraph.co.uk/content/dam/business/2024/11/22/TELEMMGLPICT000401470988_17322816658290_trans_NvBQzQNjv4BqD3d2dmOlWYuQkR76XZjLQKOylOV7i1cNNz18XOj47vE.jpeg?impolicy=Twitter-Standard" style="width: 100%;" /><div>If Northvolt cannot be revived, the bloc will be perilously exposed to China</div></div>',
          link: "https://www.telegraph.co.uk/business/2024/11/22/how-electric-car-apathy-brought-down-europes-battery-giant/",
          id: "82eebf0d400611442546a9d9ee5163a7",
          authors: [
            {
              name: "Matthew Field",
            },
          ],
          published: "Fri, 22 Nov 2024 14:21:00 GMT",
          published_parsed: [2024, 11, 22, 14, 21, 0, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://www.telegraph.co.uk/content/dam/business/2024/11/22/TELEMMGLPICT000401470988_17322816658290_trans_NvBQzQNjv4BqD3d2dmOlWYuQkR76XZjLQKOylOV7i1cNNz18XOj47vE.jpeg?impolicy=Twitter-Standard",
            },
          ],
          content:
            "On the edge of the Arctic Circle, thousands of employees at Northvolt trudged to work on Friday morning, braving snow, slush and winter darkness, facing an uncertain future.\n\nThe company’s giant gigafactory, in the Swedish town of Skellefteå, remains operational for now. But on Thursday night, at a court in New York, Northvolt’s lawyers filed for bankruptcy protection amid a cash crisis for the European battery champion.\n\nDespite raising more than $15bn (£12bn) from investors, bondholders, pension funds and European governments since it was founded in 2016, this week the company had less than one week’s cash remaining – $30m.\n\nNorthvolt has blamed its downfall on foundering demand for electric vehicles (EVs) across Europe. Its “capital structure and business plan were premised on the assumption that the electric vehicle industry would continue its pattern of consistent growth”, said Scott Millar, a restructuring adviser at Teneo, in the company’s court pleading.\n\nAs investor fervour for EVs reached its peak during the pandemic, Northvolt expanded aggressively across Europe, the United States and Canada, with plans for a network of gigafactories, as the facilities that manufacture car batteries are known.\n\nHowever, the bottom fell out of the global market for battery-powered cars in 2023 as inflation and hesitant consumer demand led to a slowdown – and in some cases slump – in EV sales.\n\nAnalysts at Rho Motion pared back their predictions for EV sales by a quarter, to 8.3m by 2030. In Europe, home to Northvolt’s biggest clients, demand has been particularly weak. Sales are down 3pc so far this year, according to Rho Motion. In Germany, they have fallen by 18pc.",
          extracted_data: {
            summary:
              "Northvolt, a European battery manufacturer, has filed for bankruptcy protection due to a cash crisis, despite raising over $15 billion since its founding in 2016. The company attributes its financial troubles to a decline in demand for electric vehicles (EVs) across Europe, which disrupted its business plan based on expected growth in the EV industry. The global market for battery-powered cars has slowed significantly in 2023, with European sales particularly weak, including an 18% drop in Germany.",
            keywords: [
              "Northvolt",
              "bankruptcy protection",
              "electric vehicles",
              "cash crisis",
              "gigafactory",
              "Skellefteå",
              "EV market decline",
            ],
            facts: [
              "Northvolt filed for bankruptcy protection in a New York court.",
              "The company raised more than $15 billion from various investors since 2016.",
              "Northvolt had less than $30 million in cash remaining this week.",
              "The company blamed its financial issues on declining demand for EVs in Europe.",
              "Global EV market slowed in 2023 due to inflation and hesitant consumer demand.",
              "Rho Motion reduced EV sales predictions by a quarter to 8.3 million by 2030.",
              "European EV sales are down 3% this year, with an 18% drop in Germany.",
            ],
            important_dates: {},
          },
        },
        {
          title:
            "EU battery hopes in tatters as Northvolt CEO resigns and company files for bankruptcy",
          rss_summary:
            '<div><img src="https://www.politico.eu/cdn-cgi/image/width=1200,height=630,fit=crop,quality=80,onerror=redirect/wp-content/uploads/2024/11/22/GettyImages-2105321833-scaled.jpg" style="width: 100%;" /><div>The company ran into big problems with production at a time when demand for EVs slumped.</div></div>',
          link: "https://www.politico.eu/article/northvolt-bankruptcy-ceo-peter-carlsson-resign-eu-battery/",
          id: "4923acaa0e381a1bf0e649bef56bfc65",
          authors: [
            {
              name: "Jordyn Dahl",
            },
          ],
          published: "Fri, 22 Nov 2024 12:38:41 GMT",
          published_parsed: [2024, 11, 22, 12, 38, 41, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://www.politico.eu/cdn-cgi/image/width=1200,height=630,fit=crop,quality=80,onerror=redirect/wp-content/uploads/2024/11/22/GettyImages-2105321833-scaled.jpg",
            },
          ],
          content:
            "The company managed to create an EV battery without lithium or other critical raw materials that China controls. However, it ran into large problems with overspending, management and production. It was also hit with an unexpected slowdown in EV demand.\n\n\"Why didn't we solve the financing sooner? It was an incredibly complicated game to get bridging financing between different stakeholders. We finally had to give up on that attempt,\" Carlsson told reporters.\n\nHe blamed the company's difficulties on starting new production facilities with innovative technology. \"When you start with new products, build a new factory, and hire new employees, you're taking on a significant challenge,\" he said.\n\nWhile the Chapter 11 filing will allow it to restructure, Northvolt's meteoric rise is over as it struggles to bring in new financing.\n\nTom Johnstone, the interim chair of Northvolt’s board, said: “This decisive step will allow Northvolt to continue its mission to establish a homegrown, European industrial base for battery production.”\n\nIn a remark to reporters, Carlsson said the company needs to raise between $1 billion and $1.2 billion to get the company back on track. By filing for bankruptcy protection in the U.S., it now has access to $145 million in cash collateral and $100 million in new financing from one of its existing customers, the company said.",
          extracted_data: {
            summary:
              "Northvolt, a company that developed an EV battery without lithium or other critical raw materials, is facing financial difficulties due to overspending, management issues, and a slowdown in EV demand. The company has filed for Chapter 11 bankruptcy protection in the U.S. to restructure and secure new financing. It needs to raise between $1 billion and $1.2 billion to stabilize operations. Northvolt has access to $145 million in cash collateral and $100 million in new financing from an existing customer.",
            keywords: [
              "Northvolt",
              "EV battery",
              "Chapter 11",
              "bankruptcy protection",
              "financing",
              "lithium-free battery",
              "production challenges",
            ],
            facts: [
              "Northvolt created an EV battery without lithium or other critical raw materials.",
              "The company faced problems with overspending, management, and production.",
              "There was an unexpected slowdown in EV demand affecting the company.",
              "Northvolt filed for Chapter 11 bankruptcy protection in the U.S.",
              "The company needs to raise between $1 billion and $1.2 billion to stabilize.",
              "Northvolt has access to $145 million in cash collateral and $100 million in new financing from an existing customer.",
            ],
            important_dates: {},
          },
        },
        {
          title:
            "Kia EV6 GT gets even more power plus trick gearbox from Hyundai Ioniq 5 N",
          rss_summary:
            '<div><img src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1702040915/autoexpress/2023/12/Kia%20EV6%20vs%20Ford%20Mustang%20Mach%20E%20GT%20003_nbj6dd.jpg" style="width: 100%;" /><div>Already Kia’s most powerful car, the EV6 GT will now produce up to 641bhp and 770Nm of torque</div></div>',
          link: "https://www.autoexpress.co.uk/kia/ev6/365117/kia-ev6-gt-gets-even-more-power-plus-trick-gearbox-hyundai-ioniq-5-n",
          id: "0686beebe9100b0122ae35b8ebf610a0",
          authors: [
            {
              name: "Ellis Hyde",
            },
          ],
          published: "Fri, 22 Nov 2024 12:06:02 GMT",
          published_parsed: [2024, 11, 22, 12, 6, 2, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1702040915/autoexpress/2023/12/Kia%20EV6%20vs%20Ford%20Mustang%20Mach%20E%20GT%20003_nbj6dd.jpg",
            },
          ],
          content:
            "The Kia EV6 GT is about to receive even more power – and will also get one of the more novel features from the closely related Hyundai Ioniq 5 N.\n\nAlready the most powerful car in Kia’s line-up, the EV6 GT currently produces 577bhp and 740Nm of torque from its dual-motor powertrain. However, as part of a mid-life refresh, the maximum power output has jumped to 641bhp and 770Nm of torque when ‘GT’ mode is activated. During everyday driving, there will be 601bhp on tap, and the same 740Nm as before.\n\nAdvertisement - Article continues below\n\nAccordingly, performance is likely to be improved. 0-62mph takes just 3.5 seconds in the outgoing EV6 GT, and while Kia has not yet confirmed a figure for the upgraded model, we expect that extra power will have shaved at least a tenth of a second off the already impressive sprint time.\n\nThat would enable it to at least match the Hyundai Ioniq 5 N’s 3.4-second 0-62mph sprint, and come close to the Tesla Model 3 Performance’s time of roughly three seconds.\n\nThe only other detail Kia has confirmed so far is that the EV6 GT will get a new ‘Virtual Gear Shift’ feature, just like the Ioniq 5 N. It’s designed to create a more engaging driving experience by adjusting the car’s torque output to deliver a small jolt and create the impression of a gear change when you pull on the paddles on the steering wheel.",
          extracted_data: {
            summary:
              "The Kia EV6 GT is set to receive a power boost as part of a mid-life refresh, increasing its output to 641bhp and 770Nm of torque in 'GT' mode. This upgrade is expected to improve its 0-62mph time, potentially matching the Hyundai Ioniq 5 N's 3.4 seconds. Additionally, the EV6 GT will feature a new 'Virtual Gear Shift' for a more engaging driving experience.",
            keywords: [
              "Kia EV6 GT",
              "power boost",
              "641bhp",
              "770Nm torque",
              "0-62mph time",
              "Hyundai Ioniq 5 N",
              "Virtual Gear Shift",
            ],
            facts: [
              "Kia EV6 GT's power output will increase to 641bhp and 770Nm of torque in 'GT' mode.",
              "The current EV6 GT produces 577bhp and 740Nm of torque.",
              "The EV6 GT's 0-62mph time is expected to improve from 3.5 seconds.",
              "The EV6 GT will feature a 'Virtual Gear Shift' similar to the Hyundai Ioniq 5 N.",
            ],
            important_dates: {},
          },
        },
        {
          title: "Trump’s anti-EV agenda could boost Chinese car industry",
          rss_summary:
            '<div><img src="https://static.politico.com/dims4/default/55a1666/2147483647/resize/1200/quality/100/?url=https://static.politico.com/d2/45/3f2ee8e04bb39b09a20c3a4bd17e/china-auto-show-53016.jpg" style="width: 100%;" /><div>Ford CEO Jim Farley has said Chinese electric vehicles represent an “existential threat” to U.S. automakers.</div></div>',
          link: "https://www.eenews.net/articles/trumps-anti-ev-agenda-could-boost-chinese-car-industry/",
          id: "df7bd38777ef7ef0cfe3d33f2588bc2f",
          authors: [
            {
              name: "Mike Lee, Hannah Northey",
            },
          ],
          published: "Fri, 22 Nov 2024 11:57:26 GMT",
          published_parsed: [2024, 11, 22, 11, 57, 26, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://static.politico.com/dims4/default/55a1666/2147483647/resize/1200/quality/100/?url=https://static.politico.com/d2/45/3f2ee8e04bb39b09a20c3a4bd17e/china-auto-show-53016.jpg",
            },
          ],
          content:
            "If President-elect Donald Trump makes good on his threat to end the Biden administration’s support of electric vehicles, the move could clear the way for Chinese automakers to strengthen their position in the global marketplace, analysts say.\n\nDuring the campaign, Trump pledged to stop the Biden administration’s “insane electric vehicle mandate.” Though no such mandate exists, Trump still could repeal EPA and Transportation Department regulations that are intended to both bolster domestic supply chains for batteries and push domestic carmakers to produce more battery-powered cars and trucks.\n\nTrump also could work with Congress to roll back tax credits in the Inflation Reduction Act for people who buy EVs or credits for manufacturers and battery-makers. And he could increase the Biden administration’s tariffs on Chinese vehicles and Chinese-sourced materials and components for those vehicles.\n\nAdvertisement\n\nThe moves aren’t expected to stop the growing global demand for EVs and other clean-energy technology, according to a report from Johns Hopkins University’s Net Zero Industrial Policy Lab. But they could make it harder for U.S. companies to compete internationally.",
          extracted_data: {
            summary:
              "President-elect Donald Trump may end the Biden administration's support for electric vehicles, potentially benefiting Chinese automakers in the global market. Trump could repeal regulations supporting domestic battery supply chains and EV production, roll back tax credits for EV buyers and manufacturers, and increase tariffs on Chinese vehicles and materials. These actions might hinder U.S. companies' ability to compete internationally, despite the growing global demand for EVs.",
            keywords: [
              "Donald Trump",
              "electric vehicles",
              "Biden administration",
              "Chinese automakers",
              "global marketplace",
              "EPA regulations",
              "Inflation Reduction Act",
              "tariffs",
              "Johns Hopkins University",
            ],
            facts: [
              "Donald Trump may end support for electric vehicles from the Biden administration.",
              "Trump could repeal EPA and Transportation Department regulations supporting domestic battery supply chains and EV production.",
              "Trump might roll back tax credits in the Inflation Reduction Act for EV buyers and manufacturers.",
              "Trump could increase tariffs on Chinese vehicles and materials.",
              "These actions could hinder U.S. companies' international competitiveness despite growing global EV demand.",
            ],
            important_dates: {},
          },
        },
        {
          title: "Tiger Sport 660: Safety Update And New Colours",
          rss_summary:
            '<div><img src="http://motoringworld.in/wp-content/uploads/2024/11/Tiger-Sport-660-1.jpg" style="width: 100%;" /><div>Discover the updated Triumph Tiger Sport 660, featuring an IMU for improved safety and fresh colour choices.</div></div>',
          link: "https://motoringworld.in/bike-news/tiger-sport-660-safety-update-and-new-colours/",
          id: "6cc0c36102957febbca3f99b2c9f848f",
          authors: [
            {
              name: "Adithya Prasad",
            },
          ],
          published: "Fri, 22 Nov 2024 11:37:18 GMT",
          published_parsed: [2024, 11, 22, 11, 37, 18, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "http://motoringworld.in/wp-content/uploads/2024/11/Tiger-Sport-660-1.jpg",
            },
          ],
          content:
            "Triumph has unveiled its revamped Tiger Sport 660, sprinkling in enough upgrades to keep it sharp and seductive. From a clever inertial measurement unit to a bi-directional quick-shifter, this middleweight tourer is all set to make every ride smoother, safer, and—let’s be honest—cooler.\n\nSharper Safety Tech\n\nThe big headline here is the addition of an Inertial Measurement Unit (IMU). Fancy name, but what it does is dead clever: it brings cornering smarts to the traction control and ABS. Think of it as a guardian angel that steps in when the tyres scream for mercy—keeping you upright whether you’re hammering the brakes mid-lean or cracking open the throttle on a wet apex.\n\nEffortless Riding Experience\n\nThe bi-directional quick-shifter reminds you to forget the clutch, just flick through the gears and enjoy the ride. And there’s more wizardry on offer. Triumph’s connectivity system now comes as standard, letting you pair your phone via Bluetooth to keep an eye on calls, texts, and even navigation—all beamed onto a slick TFT screen.\n\nWith two new colours—Roulette Green and Crystal White—it’s like dressing the same sharp suit in a pair of trendy new ties. Simple but effective.\n\nPerformance That Delivers\n\nUnder the skin, the Tiger’s heart remains unchanged—and why fix what isn’t broken? The 660cc inline-three-cylinder engine churns out 80bhp at 10,250rpm and 6.5kgm of torque at 6,250rpm. Translation? It’s butter-smooth when you’re pottering through town, with a growl and punch that’s ready to pounce when the open road calls. Whether it’s city streets or alpine twists, the Tiger delivers with effortless charm.",
          extracted_data: {
            summary:
              "Triumph has updated its Tiger Sport 660 with new features like an Inertial Measurement Unit for enhanced safety and a bi-directional quick-shifter for a smoother ride. The bike also includes a connectivity system for phone integration and comes in two new colors. The engine remains the same, offering 80bhp and 6.5kgm of torque, providing a smooth and powerful performance.",
            keywords: [
              "Triumph Tiger Sport 660",
              "Inertial Measurement Unit",
              "bi-directional quick-shifter",
              "connectivity system",
              "660cc engine",
            ],
            facts: [
              "Triumph unveiled the revamped Tiger Sport 660.",
              "The bike features an Inertial Measurement Unit for improved traction control and ABS.",
              "A bi-directional quick-shifter is included for clutchless gear changes.",
              "The connectivity system allows phone pairing via Bluetooth.",
              "The engine is a 660cc inline-three-cylinder producing 80bhp and 6.5kgm of torque.",
            ],
            important_dates: {},
          },
        },
        {
          title:
            "Elon Musk has cozied into Trump’s White House. How long will this bromance last?",
          rss_summary:
            '<div><img src="https://i.guim.co.uk/img/media/852a6e8fc18dc73aa1fecbac5bb5396d881a7ad7/0_331_5000_3002/master/5000.jpg?width=1200&amp;height=630&amp;quality=85&amp;auto=format&amp;fit=crop&amp;overlay-align=bottom%2Cleft&amp;overlay-width=100p&amp;overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctb3BpbmlvbnMucG5n&amp;s=d34a70efae86b051bc70e72f91c62eb9" style="width: 100%;" /><div>The absurd Musk-Trump pact might have a silver lining: their relationship, like Trump’s coalition at large, is fragile</div></div>',
          link: "https://www.theguardian.com/commentisfree/2024/nov/22/elon-musk-donald-trump",
          id: "05d1ada262480e36a90c120fe89e15f3",
          authors: [
            {
              name: "Katrina vanden Heuvel",
            },
          ],
          published: "Fri, 22 Nov 2024 11:00:11 GMT",
          published_parsed: [2024, 11, 22, 11, 0, 11, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://i.guim.co.uk/img/media/852a6e8fc18dc73aa1fecbac5bb5396d881a7ad7/0_331_5000_3002/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctb3BpbmlvbnMucG5n&s=d34a70efae86b051bc70e72f91c62eb9",
            },
          ],
          content:
            "It’s deja vu all over again, again. In the wake of Donald Trump’s decisive re-election, his transition team has moved to pack his cabinet and adviser positions with figures straight out of the Star Wars cantina – some of the most dangerous and bizarre sideshows from every corner of his chaotic galaxy.\n\nIn the Trump Cinematic Universe, loyalty usurps qualification. That’s why Pete Hegseth, a Fox News host who wants to eliminate “woke” officials from the military, got tapped to oversee our national defense. And it’s why Matt Gaetz was asked to helm the very Department of Justice that was investigating him for alleged sex trafficking, before his abrupt withdrawal from consideration.\n\nBut perhaps no figure better captures the cartoonish nature of Trump’s staffing philosophy than Elon Musk, the literal richest man on Earth, who has somehow grabbed the wheel of a presidential transition that’s navigating the road ahead about as well as one of his Teslas.\n\nFrom offering his two cents on presidential appointments, to joining calls with the Ukrainian president, to adjudicating the race for Senate majority leader via an X poll, the man who broke Twitter now has his sights set on breaking the federal government. He’s poised to hack the budget, ramrod in his half-baked policy musings and push through deregulation that will inevitably benefit his fleet of companies.\n\nLike any great romcom, Musk and Trump got off to a rocky start. Two years ago, before he donned a “dark gothic Maga” cap himself, Musk was urging Trump to “hang up his hat”, and Trump was calling Musk too chicken to buy Twitter. But then Musk did buy Twitter, and began diligently turning it into a bastion of rightwing misinformation called X.\n\nThe arc of this entanglement reached its inevitable conclusion when Musk rewired the platform’s algorithm to promote his own conspiracies about immigrants and election interference, while also giving free advertisement to Trump to the tune of 2bn views. Though Trump was already the first major party nominee to own a social media platform in Truth Social, he now essentially leases a second one for free.\n\nWhile Trump received support from Musk gratis, his voters received million-dollar checks. For all Musk’s handwringing about “ballot harvesting”, he engaged in a brazen election interference scheme when he more or less paid citizens to vote for Trump.\n\nMusks’s so-called sweepstakes, which a Pennsylvania court waved through, culminates big money’s political playbook. Billionaires no longer need to launder their bribes through Super Pacs with vaguely patriotic names. They can avoid that rigmarole, cut out the middleman and offer direct financial incentives for supporting whichever candidate they deem most favorable to their business interests.\n\nAnd now that Musk’s doubtfully legal efforts have paid off in the election of the country’s first president with a felony conviction, the true singularity can begin – not the merging of humans with AI supposedly portended by Neuralink, but of Musk’s agenda with Trump’s. There’s no shortage of “catastrophic conflicts of interest”, to quote former chief of government ethics Walter Shaub. Sure enough, Musk’s corporate empire has received $15bn in public contracts, while facing 20 federal investigations. But it would be no more than coincidence should that first number skyrocket and the second number plummet over the next four years.\n\nThe Department of Government Efficiency is not actually a department, nor is it government – so its proposals can be dispensed with efficiently\n\nMore troubling than his informal heft as Trump’s self-proclaimed “first buddy”, though, is Musk’s appointment to co-lead the Department of Government Efficiency – which, as many have pointed out, somehow takes two people to lead. This glorified taskforce has a mandate to slash government costs, regulations and employment. With his typical spunk, Musk has pledged to eliminate a third of the $6.75tn federal budget, not unlike how he cut half of Twitter’s workforce.\n\nFortunately for Musk, that austerity doesn’t extend to his own bank account, which has received a generous Trump bump. Post-election Tesla stock surges have already earned him $70bn, and Musk’s appointment may also qualify him to receive a massive tax break. That seems only appropriate given that this faux department’s name abbreviates to Doge, a cryptocurrency that Musk owns “a bunch of”.\n\nNevertheless, the patent absurdity of the Musk-Trump pact just might offer a silver lining for Democrats. First, analysts and casual observers alike remain skeptical of how long the honeymoon can last between two narcissists whose power is exceeded only by their pettiness. Their relationship, like Trump’s coalition at large, is perilous and fragile.\n\nSecond, Doge’s recommendations are just that: nonbinding. Trump himself has described Musk and Ramaswamy as offering “advice and guidance from outside of government”. That means the Department of Government Efficiency is not actually a department, nor is it government – so its proposals can be dispensed with efficiently.\n\nThis cuts both ways. The few worthy, populist ideas that could expand the Trump administration’s appeal – like reining in the Pentagon – will never get past a Republican House of Representatives. And if they dared touch entitlements like Social Security, Medicare and Medicaid, there won’t be a Republican House for much longer.\n\nMusk is clearly attempting to emulate Trump’s governing style. But Trump has consistently proven a more effective huckster than head of state. On the campaign trail, he was a Rorschach test: voters projected their grievances and aspirations on to his concepts of a plan. But a record is concrete. Soon enough, reality will sharpen into undeniable focus, one bad bromance at a time.",
          extracted_data: {
            summary:
              "The article discusses the aftermath of Donald Trump's re-election, highlighting his controversial cabinet appointments, including figures like Pete Hegseth and Matt Gaetz. It focuses on Elon Musk's involvement in Trump's transition team, emphasizing Musk's influence on government policies and his financial gains post-election. The article critiques Musk's appointment to the Department of Government Efficiency, a non-official taskforce aimed at reducing government costs. It also explores the potential conflicts of interest and the fragile alliance between Trump and Musk, suggesting that their partnership may not last long.",
            keywords: [
              "Donald Trump",
              "Elon Musk",
              "cabinet appointments",
              "Department of Government Efficiency",
              "conflicts of interest",
              "election interference",
              "Musk-Trump alliance",
            ],
            facts: [
              "Donald Trump was re-elected and is forming a new cabinet.",
              "Elon Musk is involved in Trump's transition team and government efficiency efforts.",
              "Musk's influence includes financial gains and potential conflicts of interest.",
              "Musk's appointment to the Department of Government Efficiency is controversial.",
              "The Department of Government Efficiency is not an official government department.",
            ],
            important_dates: {},
          },
        },
        {
          title: "'Pothole get-out-of-jail card being used by councils'",
          rss_summary:
            '<div><img src="https://ichef.bbci.co.uk/news/1024/branded_news/ee5a/live/cb689b40-a838-11ef-98bd-c3011bfd8fce.jpg" style="width: 100%;" /><div>New analysis has revealed Gloucestershire has lowest rate of successful pothole damage claims.</div></div>',
          link: "https://www.bbc.co.uk/news/articles/crlnwdy0e72o",
          id: "3f55c9c290230b6513bf2ce6f6478cb6",
          authors: [
            {
              name: "@BBCNews",
            },
          ],
          published: "Fri, 22 Nov 2024 09:29:13 GMT",
          published_parsed: [2024, 11, 22, 9, 29, 13, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://ichef.bbci.co.uk/news/1024/branded_news/ee5a/live/cb689b40-a838-11ef-98bd-c3011bfd8fce.jpg",
            },
          ],
          content:
            'Just 2% of pothole damage claims against Gloucestershire County Council are successful, new analysis shows.\n\nThis figure is the lowest of all 18 local authorities surveyed, with the other councils they approached paying out on an average of 20% of claims.\n\nThe council said it did does not "have to use taxpayers’ funds to pay out on many claims as we have a robust system of inspections and repairs in place".\n\nSimon Williams, head of policy at the RAC said: "There\'s a get-out-of-jail-free card for councils that they don\'t have to pay compensation if they aren\'t aware of the pothole."',
          extracted_data: {
            summary:
              "A new analysis reveals that only 2% of pothole damage claims against Gloucestershire County Council are successful, the lowest among 18 surveyed local authorities. In contrast, other councils pay out an average of 20% of claims. The council attributes this to their robust system of inspections and repairs. Simon Williams from the RAC notes that councils are not obligated to pay compensation if they are unaware of the pothole.",
            keywords: [
              "Gloucestershire County Council",
              "pothole damage claims",
              "local authorities",
              "inspections and repairs",
              "RAC",
            ],
            facts: [
              "Only 2% of pothole damage claims against Gloucestershire County Council are successful.",
              "This is the lowest success rate among 18 surveyed local authorities.",
              "Other councils pay out on an average of 20% of claims.",
              "Gloucestershire County Council claims to have a robust system of inspections and repairs.",
              "Councils are not required to pay compensation if they are unaware of the pothole, according to Simon Williams from the RAC.",
            ],
            important_dates: {},
          },
        },
        {
          title:
            "Northvolt files for bankruptcy protection in blow to Europe’s EV ambitions",
          rss_summary:
            '<div><img src="https://i.guim.co.uk/img/media/661d7f154019bc8bc14058ea460b7e361231dc73/0_96_3012_1807/master/3012.jpg?width=1200&amp;height=630&amp;quality=85&amp;auto=format&amp;fit=crop&amp;overlay-align=bottom%2Cleft&amp;overlay-width=100p&amp;overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&amp;s=4535e54812dde6db49c45e1292da7a19" style="width: 100%;" /><div>Swedish maker of battery cells for electric vehicles says it has enough cash to support operations for only a week</div></div>',
          link: "https://www.theguardian.com/environment/2024/nov/22/northvolt-files-bankruptcy-protection-europe-electric-vehicles-battery",
          id: "bf7cf263bd80e850c1ee8bd6bc20e51a",
          authors: [
            {
              name: "Guardian staff reporter",
            },
          ],
          published: "Fri, 22 Nov 2024 09:05:33 GMT",
          published_parsed: [2024, 11, 22, 9, 5, 33, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://i.guim.co.uk/img/media/661d7f154019bc8bc14058ea460b7e361231dc73/0_96_3012_1807/master/3012.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=4535e54812dde6db49c45e1292da7a19",
            },
          ],
          content:
            "The chief executive of Northvolt has resigned, after the Swedish battery startup filed for bankruptcy protection in the US.\n\nPeter Carlsson, who has led Northvolt since 2016, will step aside with immediate effect, the company said on Friday. Carlsson said Northvolt, which is widely seen as a leading player in European efforts to build an electric vehicle battery industry, needs to raise between $1bn (£800m) and $1.2bn in order to restore the business.\n\nNorthvolt has built a factory in northern Sweden where it hopes to use green energy to produce hundreds of thousands of EV batteries each year. It was the most prominent of a host of European startups hoping to challenge the dominant Asian battery industry.\n\nHowever, the company has tipped into crisis in recent months as cash ran dry and it experienced problems getting its first factory up and running properly.\n\nNorthvolt on Thursday announced it would seek Chapter 11 bankruptcy protection in the US after talks over rescue investments failed. It said it had enough cash to support operations for only about a week and it had secured $100m (£80m) in new financing for the bankruptcy process. It said operations would continue as normal during the bankruptcy.\n\n“Northvolt’s liquidity picture has become dire,” the company said in its Chapter 11 petition, filed in a bankruptcy court in Houston. Northvolt, which has operations in California, has about $30m in cash and about $5.8bn of debts.\n\nThe company, which employs about 6,600 staff across seven countries, expects to complete the restructuring by the first quarter of 2025.\n\nIn September, Northvolt said it would cut 1,600 jobs in response to “headwinds” blowing through the EV industry. It has also faced criticism for trying to build several factories at the same time, in Sweden, Germany and the US.\n\nWithin months, Northvolt has gone from a much-heralded startup to a company struggling to stay afloat by slimming down, and hobbled by production problems, the loss of BMW as an anchor customer and a lack of funding.\n\nEurope has been hoping that Northvolt would reduce western carmakers’ reliance on Asian rivals, which built their dominant position out of decades of experience in making batteries for consumer electronics. Industry leaders include China’s CATL and the EV and battery maker BYD, Japan’s Panasonic and South Korea’s LG.\n\nNorthvolt said the $100m was part of $245m in financing support for the bankruptcy. The Swedish truck maker Scania, a shareholder and its biggest customer, has said it will loan $100m to Northvolt to support the manufacturing of EV battery cells in Skellefteå, northern Sweden.\n\nCarlsson, who will remain as a “senior adviser” and a member of the board, said the company had been “like a baby” to him, but that it had struggled to ramp up production.\n\n“In hindsight, we were overambitious on the timing in which we could achieve it,” he added.\n\nThe investment group Vargas, a co-founder of Northvolt and one of its largest shareholders, said the bankruptcy would allow the company to address financial challenges and maintain its competitive edge in producing high-performance battery cells.\n\nBut EV demand is growing at a slower pace than some in the industry had projected, and competition remains stiff from China, which controls 85% of global battery-cell production, according to International Energy Agency data.\n\nThe Swedish deputy prime minister, Ebba Busch, said on X that the government continued to support the EV battery industry and hoped the restructuring would help turn around Northvolt’s fortunes.",
          extracted_data: {
            summary:
              "Northvolt, a Swedish battery startup, has filed for Chapter 11 bankruptcy protection in the US due to financial difficulties. CEO Peter Carlsson has resigned, and the company needs to raise $1bn to $1.2bn to stabilize. Northvolt, which aimed to challenge the Asian battery industry, has faced cash shortages and production issues at its Swedish factory. It has secured $100m in new financing for the bankruptcy process and plans to restructure by early 2025. The company has also announced job cuts and lost BMW as a major customer. Despite these challenges, Northvolt continues operations and has support from Scania and other stakeholders.",
            keywords: [
              "Northvolt",
              "bankruptcy",
              "Peter Carlsson",
              "electric vehicle batteries",
              "Chapter 11",
              "Sweden",
              "Asian battery industry",
              "restructuring",
              "Scania",
            ],
            facts: [
              "Northvolt has filed for Chapter 11 bankruptcy protection in the US.",
              "Peter Carlsson, CEO of Northvolt, has resigned.",
              "Northvolt needs to raise between $1bn and $1.2bn to restore the business.",
              "The company has built a factory in northern Sweden for EV battery production.",
              "Northvolt has secured $100m in new financing for the bankruptcy process.",
              "The company has about $30m in cash and $5.8bn of debts.",
              "Northvolt plans to complete restructuring by the first quarter of 2025.",
              "The company announced it would cut 1,600 jobs.",
              "Northvolt lost BMW as an anchor customer.",
              "Scania will loan $100m to support Northvolt's manufacturing.",
            ],
            important_dates: {
              "2016": "Peter Carlsson has led Northvolt since this year.",
              September: "Northvolt announced it would cut 1,600 jobs.",
              Thursday:
                "Northvolt announced it would seek Chapter 11 bankruptcy protection in the US.",
              "first quarter of 2025":
                "Northvolt expects to complete the restructuring by this time.",
            },
          },
        },
        {
          title:
            "Britons face road carnage with drivers losing out massively on compensation claims - 'Tip of the iceberg'",
          rss_summary:
            '<div><div style="width: 100%; height: 0; padding-bottom: 56.25%;"></div></div>',
          link: "https://www.gbnews.com/lifestyle/cars/britons-road-carnage-pothole-compensation-claims",
          id: "752868b01851da4bfde2cdb34166e2d1",
          authors: [
            {
              name: "Felix Reeves",
            },
          ],
          published: "Fri, 22 Nov 2024 08:51:01 GMT",
          published_parsed: [2024, 11, 22, 8, 51, 1, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://www.gbnews.com/media-library/watch-mr-pothole-says-he-has-no-faith-in-any-politician-to-fix-the-uk-s-roads.jpg?id=53892044&width=1200&height=600&coordinates=0%2C417%2C0%2C266",
            },
          ],
          content:
            "Pothole compensation claims submitted to local authorities across Britain have more than doubled in just one year, new data from the RAC has found.\n\nClaims surged from 8,327 in 2022 to a staggering 20,432 in 2023, according to research obtained from 18 councils responsible for Britain's longest road networks.\n\nSurrey County Council witnessed the most dramatic increase, with claims jumping from 734 to 3,418. Hampshire followed closely behind, seeing claims rise from 750 to 2,654 over the same period. The Freedom of Information data from councils covering nearly 92,200 miles of local roads, highlight the growing crisis facing British motorists.\n\nDo you have a story you'd like to share? Get in touch by emailingmotoring@gbnews.uk\n\nLabour pledged an additional £500million in the Budget to fill in potholes PA\n\nDespite the surge in claims, councils are proving reluctant to compensate drivers for pothole damage. Data shows that 17 councils paid out just 15 per cent of the 20,432 claims submitted in 2023. The chances of successful compensation are particularly slim, with 13 councils refusing more than three-quarters of claims received. Five councils stood out for rejecting nine in 10 claims, with Gloucestershire County Council refusing 98 per cent of its 829 claims. Essex County Council turned down 95 per cent of its 2,560 claims, while Kent and Cornwall Councils both rejected 92 per cent of their claims. Only Shropshire Council showed a more generous approach, paying 68 per cent of its 546 claims in 2023.\n\n\n\nThe trend appears to be worsening, with the average number of refused claims rising from 76 per cent to 81 per cent between 2021 and 2023. The majority of rejected claims were thrown out because councils claimed they had no prior knowledge of the potholes. Of nine councils that provided detailed refusal data, 74 per cent of rejections - some 6,028 claims - were refused under Section 58 of the Highways Act 1980, which allows councils to reject claims if they were unaware of the pothole's existence. Gloucestershire and Hertfordshire councils took this approach to the extreme, citing a lack of prior knowledge for every single rejected claim.\n\nRAC head of policy Simon Williams described the findings as \"a stark reminder that the ongoing poor condition of many of the UK's local roads is burning holes in the budgets of both local authorities and drivers\". He noted that some councils appeared to prioritise paying legal fees over settling claims, with £166,000 being spend to defend compensation claims. He said: \"The cost in time and money of defending claims appears to far outweigh the expense of reimbursing drivers for the damage done to their vehicle in the first place. \"Even if a driver successfully pursued compensation, the average sum paid out of £260 is often well below the cost to fix a pothole-damaged car, for anything more serious than a punctured tyre. LATEST DEVELOPMENTS: SUV owners issued serious threat as climate protesters target 'monster' vehicles - 'Time to hold them to account'\n\nDrivers with larger petrol and diesel cars could face 'Land Rover tax' and new parking restrictions\n\n\n\nElderly motorists face strong calls to have 'mature driving assessments' and eyesight checks\n\nLabour pledged to repair one million more potholes per year in its manifesto PA",
          extracted_data: {
            summary:
              "Pothole compensation claims in Britain have more than doubled from 8,327 in 2022 to 20,432 in 2023, with Surrey and Hampshire councils seeing the largest increases. Despite the rise in claims, councils are reluctant to compensate, with only 15% of claims paid out. Many claims are rejected due to councils' lack of prior knowledge of the potholes, as allowed under Section 58 of the Highways Act 1980. The RAC criticizes the high legal costs councils incur to defend claims, which often exceed the cost of compensation. Labour has pledged additional funding to address the pothole issue.",
            keywords: [
              "pothole compensation",
              "RAC",
              "Surrey County Council",
              "Hampshire",
              "Section 58 Highways Act 1980",
              "Labour funding",
              "local roads",
            ],
            facts: [
              "Pothole claims in Britain increased from 8,327 in 2022 to 20,432 in 2023.",
              "Surrey County Council's claims rose from 734 to 3,418.",
              "Hampshire's claims increased from 750 to 2,654.",
              "Only 15% of claims were compensated by 17 councils in 2023.",
              "Gloucestershire County Council rejected 98% of its claims.",
              "Section 58 of the Highways Act 1980 allows councils to reject claims if unaware of potholes.",
              "RAC highlighted high legal costs for councils defending claims.",
            ],
            important_dates: {
              "2022": "8,327 pothole claims submitted.",
              "2023": "20,432 pothole claims submitted; only 15% compensated.",
            },
          },
        },
        {
          title: "Peter Carlsson steps aside as CEO of Northvolt",
          rss_summary:
            '<div><img src="https://www.datocms-assets.com/38709/1732257484-peter-carlsson-2021.jpeg?w=1000&amp;fit=max&amp;auto=format" style="width: 100%;" /><div>Carlsson co-founded Northvolt with the mission to drive sustainable energy solutions through the creation of a pioneer in European battery production.</div></div>',
          link: "https://northvolt.com/articles/peter-carlsson-steps-aside/",
          id: "d117a68cf77b023b9df0a015231c3a78",
          authors: [
            {
              name: "northvolt.com",
            },
          ],
          published: "Fri, 22 Nov 2024 08:34:03 GMT",
          published_parsed: [2024, 11, 22, 8, 34, 3, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://www.datocms-assets.com/38709/1732257484-peter-carlsson-2021.jpeg?w=1000&fit=max&auto=format",
            },
          ],
          content:
            'Stockholm, Sweden – Today Northvolt embarks on a new phase through a Chapter 11 reorganization filing. Chapter 11 provides the company with the financing to focus on operational improvements and supporting customers, while allowing for restructuring, reorganization, and fundraising to secure a long-term competitive positioning. The company is also announcing that Peter Carlsson will take on a role as Senior Advisor and step aside from his role as CEO. He also remains a Member of the Board.\n\nPeter Carlsson has led Northvolt since its inception in 2016. He co-founded Northvolt with the mission to drive sustainable energy solutions through the creation of a pioneer in European battery production. Northvolt Ett is the first truly European battery gigafactory delivering to customers at large scale. Northvolt Labs is the epicenter of European battery research and development, achieving technical breakthroughs and leading in patent creation. In parallel, Northvolt is building groundbreaking facilities in Heide, Germany and Montreal, Canada, catering for a completely new industry in the Western economies.\n\nPeter Carlsson commented: “Today marks a significant new phase for Northvolt as well as for me personally. The Chapter 11 filing allows a period during which the company can be reorganized, ramp up operations while honoring customer and supplier commitments, and ultimately position itself for the long-term. That makes it a good time for me to hand over to the next generation of leaders."\n\nNorthvolt’s Interim Chairman of the Board of Directors, Tom Johnstone, commented: “We are incredibly thankful to Peter for his vision and dedication to building Northvolt from an unprecedented idea to becoming Europe’s battery manufacturing champion. Peter’s perspective will continue to benefit Northvolt, as a Senior Advisor and Member of the Board, while the new leadership will steer the company into the next stage.”\n\nThe company leadership will consist of Pia Aaltonen-Forsell, Chief Financial Officer, and Matthias Arleth, the President of Cells, who will now take the role of Chief Operations Officer. Together, and supported by Scott Millar as Chief Restructuring Officer, they will jointly lead Northvolt. The search process for a new CEO has been initiated.\n\nTom Johnstone, added: “I am very pleased that the two recent additions to Northvolt’s leadership will jointly lead this next phase of operational improvement, increased customer focus, and financial restructuring.”\n\nThis transition underscores Northvolt’s commitment to adapting to an evolving market, with the new leadership focused on advancing the company’s goals of sustainable growth, operational efficiency, and continued innovation. The changes take place with immediate effect.',
          extracted_data: {
            summary:
              "Northvolt has filed for Chapter 11 reorganization to focus on operational improvements and long-term competitive positioning. Peter Carlsson, co-founder and former CEO, will become a Senior Advisor and remain on the Board. The leadership transition includes Pia Aaltonen-Forsell as CFO and Matthias Arleth as COO, with Scott Millar as Chief Restructuring Officer. The company aims to enhance operational efficiency and sustainable growth.",
            keywords: [
              "Northvolt",
              "Chapter 11 reorganization",
              "Peter Carlsson",
              "battery production",
              "leadership transition",
              "sustainable growth",
              "operational efficiency",
            ],
            facts: [
              "Northvolt filed for Chapter 11 reorganization to focus on operational improvements and long-term competitive positioning.",
              "Peter Carlsson will step aside as CEO and become a Senior Advisor, remaining on the Board.",
              "Northvolt Ett is the first European battery gigafactory delivering at large scale.",
              "Northvolt Labs leads in European battery research and development.",
              "New leadership includes Pia Aaltonen-Forsell as CFO and Matthias Arleth as COO.",
              "Scott Millar is appointed as Chief Restructuring Officer.",
              "The search for a new CEO has been initiated.",
            ],
            important_dates: {},
          },
        },
        {
          title:
            "The new BMW F 900 R and F 900 XR: Technical and visual upgrades and significantly extended standard equipment for the dynamic roadster and long-distance sports bike in the mid-range segment.",
          rss_summary:
            '<div><img src="https://mediapool.bmwgroup.com/cache/P9/202411/P90579165/P90579165-bmw-motorrad-presents-the-new-bmw-f-900-r-and-f-900-xr-3486px.jpg" style="width: 100%;" /><div>The new BMW F 900 R and F 900 XR: Technical and visual upgrades and significantly extended standard equipment for the dynamic roadster and long-distance sports bike in the mid-range segment.</div></div>',
          link: "https://www.press.bmwgroup.com/global/article/detail/T0446319EN/bmw-motorrad-presents-the-new-bmw-f-900-r-and-f-900-xr?language=en",
          id: "5dff15fa2e54bcc82605f9b26b05e624",
          authors: [
            {
              name: "@bmwgroup",
            },
          ],
          published: "Fri, 22 Nov 2024 08:00:00 GMT",
          published_parsed: [2024, 11, 22, 8, 0, 0, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://mediapool.bmwgroup.com/cache/P9/202411/P90579165/P90579165-bmw-motorrad-presents-the-new-bmw-f-900-r-and-f-900-xr-3486px.jpg",
            },
          ],
          content:
            '"With a significantly extended range of standard equipment, fully adjustable upside-down forks, lighter wheels and a weight saving of 3 kilograms, we have been able to make the BMW F 900 R and F 900 XR even more attractive. The new BMW F 900 R also benefits from a sportier riding position and the BMW F 900 XR from optimised aerodynamics."\n\nAnton Huber, Project Manager\n\nThe new BMW F 900 R and F 900 XR: Technical and visual upgrades and significantly extended standard equipment for the dynamic roadster and long-distance sports bike in the mid-range segment.\n\nWith the new BMW F 900 R dynamic roadster and the new BMW F 900 XR crossover bike, BMW Motorrad is taking its popular mid-range product range to a new level. Both F-models are designed for sportiness and fun in twisty terrain, with even more agile handling and are suitable for experienced riders as well as newcomers and those returning to motorcycling. While the new BMW F 900 R as a Dynamic Roadster focuses primarily on sporty riding pleasure, the BMW F 900 XR has everything it takes to be a confident partner on longer tours and holiday trips with luggage.\n\nPowerful two-cylinder in-line engine with Euro 5+ homologation. Dynamic riding mode with sportier set-up, Dynamic Traction Control (DTC) and engine drag torque control now standard. New sports silencer in collaboration with Akrapovič as genuine BMW Motorrad accessories.\n\nIn the new BMW F 900 R and F 900 XR, the tried-and-tested two-cylinder in-line engine with 895 cc capacity and 77 kW (105 bhp) of power output ensures pleasurable riding dynamics. It also delivers a full-bodied torque curve in the current Euro 5+ homologation. With the newly tuned standard "Dynamic" driving mode, the two new F models offer even more riding pleasure and dynamics at a sporty pace. Dynamic Traction Control (DTC) is fitted as standard to ensure the best possible safety during acceleration. The engine drag torque control is also standard. It prevents rear wheel spin or skidding caused by abrupt throttle release or downshifting, for an even higher level of safety.\n\nThe sound of the two-cylinder engine, which already has a powerful character due to the 270/450 degree firing interval, is made even throatier by the new sports silencer available as a genuine BMW Motorrad accessory (in cooperation with Akrapovič), which also offers a weight saving of approximately 1.2 kg.\n\nNew upside-down telescopic forks with adjustable damping rebound and compression damping and spring preload. New wheels, approx. 1.8 kg lighter.\n\nBMW Motorrad ABS Pro and Dynamic Brake Control DBC as standard - for even more safety when braking.\n\nOn both the new BMW F 900 R and the new BMW F 900 XR, the front wheel is guided by new, torsionally rigid, upside-down telescopic forks with 43 mm slider tube diameter. Both rebound and compression damping as well as spring preload are now adjustable. This makes it possible to tailor the forks to suit individual requirements.\n\nThe new BMW F 900 R and F 900 XR also feature new 17-inch cast aluminium wheels. They weigh around 1.8 kg less than the previous models, contributing to a total weight reduction of 3 kg.\n\nAnother new standard feature on the new F models is BMW Motorrad ABS Pro. In contrast to BMW Motorrad ABS, ABS Pro goes one step further and offers even more safety when braking in bends by enabling ABS-assisted braking at lean angles.\n\nAnother new standard safety feature is Dynamic Brake Control (DBC), which provides even greater safety when braking in difficult situations by preventing unintentional acceleration.\n\nNew, 0.8 kg lighter battery as standard and function-integrated turn indicator lights in the new rear end. BMW F 900 XR with Headlight Pro including daytime running light, adaptive headlight, USB-C charging port and heated grips as standard.\n\nThe two new F Series models are equipped with a new battery that is 0.8 kg lighter. They also have a new rear end with function-integrated turn indicator lights (brake and tail light functions are integrated into the turn indicator lights).\n\nThe new BMW F 900 XR comes with Headlight Pro as standard, including daytime running light and adaptive headlight for even greater safety when riding at night. Other new standard features of the BMW F 900 XR include the USB-C charging port on the right-hand side of the cockpit with a maximum charging current of 2.4 A and the heated grips.\n\nBMW F 900 R with optimised ergonomics thanks to a redefined position of the handlebars and footrests for a more sporty riding position. New headlight side trim painted in body colour.\n\nThe handlebars, footrests and foot levers of the ergonomic triangle between the handlebars, seat and footrests of the new BMW F 900 R have been redesigned. This has made it possible to create a riding position that is significantly more sporty and closer to the front wheel.\n\nThe new BMW F 900 R\'s increased sporting ambitions are emphasised by the headlamp side trim painted in body colour.\n\nBMW F 900 XR with optimised aerodynamics and hand protectors as standard.\n\nThe new BMW F 900 XR offers even more touring capability and long-distance comfort thanks to optimised aerodynamics in the front fairing. The redesigned wind deflector reduces wind pressure on the rider, resulting in significantly less helmet vibration and even greater riding comfort. The hand protectors, which are standard for all equipment variants, also provides improved protection from the wind and weather.\n\nEquipment variants and colours.\n\nThe new BMW F 900 R is available in three attractive colours. The basic variant is available in Snapper Rocks Blue metallic, the Triple Black version in Blackstorm metallic and the version Sport in Lightwhite with Racingblue metallic.\n\nThe new BMW F 900 XR will also be available in three variants and colours for the coming motorcycle season. The basic variant is available in Racing Red, the Triple Black version in Blackstorm metallic and the version Sport in Lightwhite with Racingblue metallic.\n\nNew optional equipment and genuine BMW Motorrad accessories for the new\n\nBMW R 900 and R 900 XR.\n\nThe already extensive range of optional equipment and genuine BMW Motorrad accessories has been further expanded for the new model year:\n\nBMW F 900 R and F 900 XR.\n\nSports silencer in collaboration with Akrapovič.\n\nMilled footrests and foot levers.\n\nAxle protectors.\n\nLockable soft cases.\n\nMengine spoiler and passenger seat cover in new colours.\n\nBMW F 900 R.\n\nSport seat (+ 25 mm).\n\nBMW F 900 XR.\n\nHigh seat (+ 25 mm).\n\nHigh windshield (+ 30 mm).\n\nAll standard innovations as well as new genuine BMW Motorrad accessories and optional equipment at a glance:\n\nBMW F 900 R.\n\nComplies with Euro 5+ emission standards.\n\nNew ergonomics with optimised handlebar and footrest position for improved riding position.\n\nNew upside-down telescopic forks with adjustable damping rebound and compression damping and spring preload.\n\nNew wheels, approx. 1.8 kg lighter.\n\nNew battery, approx. 0.8 kg lighter.\n\nDynamic Traction Control DTC, engine drag torque control, BMW Motorrad ABS Pro and Dynamic Brake Control DBC.\n\n"Dynamic" riding mode with new settings.\n\nSlim rear end with integrated turn indicator lights.\n\nNew colours.\n\nNew genuine BMW Motorrad accessories such as sports silencer in collaboration with Akrapovič, milled footrests and foot levers as well as axle protectors and lockable soft cases.\n\nNew Sport seat (+ 25 mm seat height) available as optional equipment ex works.\n\nBMW F 900 XR.',
          extracted_data: {
            summary:
              "The new BMW F 900 R and F 900 XR have received significant technical and visual upgrades, including extended standard equipment, lighter components, and improved safety features. Both models feature a powerful two-cylinder engine with Euro 5+ homologation, Dynamic Traction Control, and engine drag torque control as standard. The F 900 R is designed for sporty riding, while the F 900 XR is optimized for long-distance touring with enhanced aerodynamics and comfort features. New standard features include BMW Motorrad ABS Pro, Dynamic Brake Control, and a lighter battery. Optional equipment and accessories have been expanded, including a sports silencer and ergonomic enhancements.",
            keywords: [
              "BMW F 900 R",
              "BMW F 900 XR",
              "Dynamic Traction Control",
              "Euro 5+ homologation",
              "BMW Motorrad ABS Pro",
              "Dynamic Brake Control",
              "sports silencer",
              "ergonomics",
              "aerodynamics",
              "optional equipment",
            ],
            facts: [
              "The BMW F 900 R and F 900 XR have a weight saving of 3 kilograms.",
              "Both models feature a two-cylinder in-line engine with 895 cc capacity and 77 kW (105 bhp) power output.",
              "Dynamic Traction Control and engine drag torque control are standard on both models.",
              "The new models include BMW Motorrad ABS Pro and Dynamic Brake Control for enhanced safety.",
              "The F 900 XR includes Headlight Pro with adaptive headlight and heated grips as standard.",
              "New wheels are approximately 1.8 kg lighter, and the battery is 0.8 kg lighter.",
            ],
            important_dates: {},
          },
        },
        {
          title: "Pilot for Bluebird's return to Coniston Water announced",
          rss_summary:
            '<div><img src="https://ichef.bbci.co.uk/news/1024/branded_news/5401/live/07f338c0-a813-11ef-bdf5-b7cb2fa86e10.jpg" style="width: 100%;" /><div>Dave Warby, son of the late-water speed record holder Ken Warby, will be in the cockpit at Coniston.</div></div>',
          link: "https://www.bbc.com/news/articles/cp9zlx5j127o",
          id: "f80c61db1d7e5f6b3f94c3aa72bca20a",
          authors: [
            {
              name: "bbc.com",
            },
          ],
          published: "Fri, 22 Nov 2024 06:00:25 GMT",
          published_parsed: [2024, 11, 22, 6, 0, 25, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://ichef.bbci.co.uk/news/1024/branded_news/5401/live/07f338c0-a813-11ef-bdf5-b7cb2fa86e10.jpg",
            },
          ],
          content:
            "Pilot announced for Bluebird's return to water\n\nGetty Images It is six years since Bluebird was in action at Loch Fad on the Isle of Bute\n\nDonald Campbell's restored Bluebird K7 is to be piloted by the son of a world-record holder when it returns to the water. The hydroplane was destroyed in 1967 when Campbell crashed in the Lake District as he attempted to push his own water speed record past 300mph (480km/h). Having been recovered from the bottom of Coniston Water 34 years later, it was rebuilt by a team of engineers on Tyneside. After a long-running ownership row, it was handed over to the Ruskin Museum, and now bosses say Australian Dave Warby, son of the late-water speed world-record holder Ken Warby, will be in the cockpit when it returns to the lake in 2026.\n\nMr Warby, a current world water speed record challenger, described it as a \"tremendous honour\". Calling Bluebird \"the most iconic water speed record boat in the world\", he said its exploits with Campbell at the controls had been the \"inspiration\" for his father to set his own world records in 1977 and 1978. His latter mark of 317mph (510km/h) still stands.\n\nDave Warby Dave Warby is aiming to break the water speed record in his own craft, Spirit of Australia II\n\nMr Warby's reserve will be RAF Flt Lt David-John Gibbs, from Grantham, Lincolnshire, who is the designated pilot for the Longbow speed record attempt being led by Dave Aldred. Two Orpheus jet engines are to be refurbished as part of the plans to get Bluebird running again. Donald Campbell's Bluebird: The battle back to Coniston Setting seven world water speed records between 1955 and 1964, it was last on water in 2018 at Loch Fad, on Scotland's Isle of Bute, following a restoration led by North Shields engineer Bill Smith. A legal row then ensued after Mr Smith claimed part-ownership due to the work he and his Bluebird Project (BBP) team had carried out. In the settlement agreed in January, when he relinquished his claim, Mr Smith paid £25,000 towards the Ruskin Museum's legal costs. It was also agreed he would have no \"further right, title or interest\" in the craft. However, since then the BBP's social media account has repeatedly called for the museum to put aside those terms and enlist the group's volunteers to help with maintenance and any future running.\n\nFollow BBC Cumbria on X, Facebook, Nextdoor and Instagram. Send your story ideas to northeastandcumbria@bbc.co.uk.",
          extracted_data: {
            summary:
              "Donald Campbell's restored Bluebird K7 hydroplane will return to the water in 2026, piloted by Dave Warby, son of world-record holder Ken Warby. The Bluebird, destroyed in 1967 during a record attempt, was rebuilt after being recovered from Coniston Water. A legal dispute over ownership was resolved, allowing the Ruskin Museum to proceed with plans for its return. Warby, a current water speed record challenger, will be supported by RAF Flt Lt David-John Gibbs. The Bluebird last ran in 2018 after a restoration led by Bill Smith, who later relinquished ownership claims.",
            keywords: [
              "Bluebird K7",
              "Donald Campbell",
              "Dave Warby",
              "water speed record",
              "Ruskin Museum",
              "Coniston Water",
              "Bill Smith",
              "restoration",
              "legal dispute",
            ],
            facts: [
              "Bluebird K7 was destroyed in 1967 during a water speed record attempt.",
              "The hydroplane was recovered from Coniston Water 34 years after the crash.",
              "Dave Warby, son of Ken Warby, will pilot Bluebird K7 in 2026.",
              "A legal dispute over Bluebird's ownership was resolved in January.",
              "The Bluebird last ran in 2018 at Loch Fad after restoration.",
            ],
            important_dates: {
              "1967":
                "Bluebird K7 was destroyed during a water speed record attempt.",
              "2018": "Bluebird last ran at Loch Fad after restoration.",
              "2026": "Bluebird K7 is scheduled to return to the water.",
            },
          },
        },
        {
          title: "2025 BMW F900 XR Specs And Pics",
          rss_summary:
            '<div><img src="https://www.advrider.com/wp-content/uploads/2024/11/P90579160_highRes-1-scaled.jpg" style="width: 100%;" /><div>The 2025 BMW F900 XR comes in three new colors, with some new bodywork and new electro-options, and improved suspension.</div></div>',
          link: "https://www.advrider.com/2025-bmw-f900-xr-specs-and-pics/",
          id: "4ca883bead2f227ab4baccac42e53498",
          authors: [
            {
              name: "ADVrider Staff",
            },
          ],
          published: "Fri, 22 Nov 2024 05:18:31 GMT",
          published_parsed: [2024, 11, 22, 5, 18, 31, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://www.advrider.com/wp-content/uploads/2024/11/P90579160_highRes-1-scaled.jpg",
            },
          ],
          content:
            "Yesterday, BMW took the wraps off a new F900 XR. It doesn’t look a lot different for 2025, but it should be a safer and more responsive and comfortable machine thanks to updates.\n\nFor starters, the safety features (traction control, ABS and even the headlight) are now cornering-sensitive. That adaptive headlight is a highly underrated safety feature and it is now included as standard, “seeing into” the corners for riders hustling along at night.\n\nThe suspension is new, and it’s completely adjustable to suit your riding style and terrain. And as always, BMW has a long list of accessories to bolt on: an official Akrapovic exhaust and lots more.\n\nBelow, see BMW’s official specs for the bike, followed by more photos.\n\nEngine Capacity cc 895 Bore/stroke mm 86.0 x 77.0 Output hp 105 @ 8,500 rpm Torque ft-lbs. 68.6 @ 6,500 rpm Type Water-cooled 2-cylinder inline engine with 4 valves per cylinder, two overhead camshafts and dry sump lubrication. Compression 13.1/1 Fuel Premium unleaded 95 RON Valves per cylinder 4 Ø intake/outlet mm 33.5 / 27.3 Ø throttle valve mm 48 Engine control BMS-ME Emission control Closed-loop three-way catalytic converter, EU-5+ Electrical system Generator W 420 Battery V/Ah 12/9 Headlight LED Headlight Pro Rear light Function-integrated LED brake/rear lights Starter W 900 Power transmission Clutch Wet, multi-disk clutch with anti-hopping function, mechanically activated Gearbox Constant mesh 6-speed integrated in engine housing Transmission ratios I 2.833 II 2.067 III 1.600 IV 1.308 V 1.103 VI 0.968 Secondary drive Endless O-ring chain with rear hub vibration dampening Primary ratio 1.184 Secondary ratio 2.588 Chassis Frame construction type Bridge-type steel frame with load-bearing engine Front wheel suspension 43 mm front forks, adjustable for compression and rebound and spring pre-load. Rear wheel suspension Aluminum double-sided swing arm, rear shock adjustable for rebound and spring pre-load.\n\nOptional dynamic ESA Spring travel, front/rear inches 6.7 / 6.8 Wheel castor inches 4.1 Wheelbase inches 60.4 Steering head angle degrees 26.0 Brakes front Twin disc brake, floating brake discs, Ø 320 mm, 4-piston radial calipers rear Single disc brake, Ø 265 mm, 1-piston floating caliper ABS BMW Motorrad ABS Pro (lean angle optimized) Wheels Cast aluminum wheels front inches 3.50 x 17” rear 5.50 x 17” Tires front 120/70 ZR 17 rear 180/55 ZR 17 Dimensions and weights Total length inches 84.3 85.0 Total width incl. hand protect. inches 34.3 36.2 Seat height inches 32.9 33.3 DIN unladen weight, road ready lbs. 459 476 Permitted total weight lbs. 958 965.8 Fuel tank capacity gallons 3.4 4.1 Performance figures Acceleration 0-62 mph seconds 3.7 3.6 Top speed mph >124\n\nHere are some more camera angles:\n\nCheck out BMW’s accessories for the F900 XR:",
          extracted_data: {
            summary:
              "BMW has unveiled the 2025 F900 XR, featuring enhanced safety and comfort. Key updates include cornering-sensitive traction control, ABS, and an adaptive headlight. The bike also boasts a new, fully adjustable suspension system. The engine is a water-cooled 2-cylinder inline with 105 hp and 68.6 ft-lbs of torque. The F900 XR includes a range of accessories, such as an Akrapovic exhaust.",
            keywords: [
              "BMW F900 XR",
              "2025 model",
              "cornering-sensitive safety features",
              "adaptive headlight",
              "adjustable suspension",
              "Akrapovic exhaust",
            ],
            facts: [
              "The 2025 BMW F900 XR features cornering-sensitive traction control, ABS, and an adaptive headlight.",
              "The bike has a new, fully adjustable suspension system.",
              "The engine is a water-cooled 2-cylinder inline with 105 hp and 68.6 ft-lbs of torque.",
              "The F900 XR includes accessories like an Akrapovic exhaust.",
            ],
            important_dates: {
              Yesterday: "BMW unveiled the 2025 F900 XR.",
            },
          },
        },
        {
          title:
            "Tesla’s path in China clears as Musk courts both Trump and Xi",
          rss_summary:
            '<div><img src="https://i.guim.co.uk/img/media/43a58b7c3a2e60f5239676068418a603a69c7c86/0_0_2500_1500/master/2500.jpg?width=1200&amp;height=630&amp;quality=85&amp;auto=format&amp;fit=crop&amp;overlay-align=bottom%2Cleft&amp;overlay-width=100p&amp;overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&amp;s=ba3d3cce129f0f93815a1bdd13c82233" style="width: 100%;" /><div>Billionaire CEO is well connected in the US and China, something that could smooth the road ahead for the electric vehicle maker amid a looming tariff war</div></div>',
          link: "https://www.theguardian.com/technology/2024/nov/22/elon-musk-tesla-china-us-relationship-trump-xi-jinping",
          id: "bffb601aa15a54f23c435262fce380d9",
          authors: [
            {
              name: "Amy Hawkins",
            },
          ],
          published: "Fri, 22 Nov 2024 00:27:22 GMT",
          published_parsed: [2024, 11, 22, 0, 27, 22, 4, 327, 0],
          media_content: [
            {
              medium: "image",
              url: "https://i.guim.co.uk/img/media/43a58b7c3a2e60f5239676068418a603a69c7c86/0_0_2500_1500/master/2500.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=ba3d3cce129f0f93815a1bdd13c82233",
            },
          ],
          content:
            "If it pays to have friends in high places, few among us can claim to be better placed than Elon Musk, the world’s richest man and one of the only people to have cosy relationships with both Donald Trump and Xi Jinping. His commercial and political connections to both may prove pivotal as the feud between the US and China plays out over the next four years, particularly as Trump promises steep tariffs.\n\nMusk, the billionaire CEO of Tesla and SpaceX, once supported Joe Biden. But his relationship with the current US president soured over the past four years as, among other insults, Musk felt that the White House gave Telsa, his car and green energy company, “the cold shoulder”. Trump, meanwhile, has described Tesla as “incredible” even while pledging to do away with subsidies for electric vehicles. This year, Musk formally endorsed Trump as the presidential candidate, campaigned for him online and off and donated more than $100m to his re-election effort.\n\nMusk’s loyalty has been rewarded with his appointment as the leader of a newly created Department of Government Efficiency (Doge), which, despite its name, will be an advisory body, not a government agency. But perhaps more important for the global economy than his official role will be the influence he has on the dynamic between the leaders of the world’s two superpowers. With a trade war that was started by Trump and expanded by Biden, and mounting geopolitical tensions, the US-China relationship has been tumbling downhill for years, with negative global consequences, not least for consumers in the US and China, who have seen prices rise as a result.\n\nUnlike the other figures in Trump’s newly appointed cabinet, such as China hawk Senator Marco Rubio, Trump’s pick for secretary of state who has been hit with sanctions by Beijing, Musk has a cosy relationship with China’s top leaders.\n\nMusk has visited China several times, most recently in April, when he made a surprise trip to Beijing to convene with the Chinese premier Li Qiang. Last year, he met the Chinese president, Xi Jinping, in San Francisco.\n\nMusk’s relationship with Li, the second-highest ranking person in China, is especially close: Li was the party secretary for Shanghai in 2019, when Tesla opened its first overseas factory there, which is now Tesla’s biggest factory by output. It was built with loans of $521m from Chinese-state owned banks, which were issued at favourable interest rates. The Shanghai government gave Tesla a beneficial corporate tax rate of 15% between 2019 and 2023, lower than the standard 25%. Tesla also reportedly managed to become the first foreign auto company to be allowed to set up without a local partner.\n\nAnd construction has now started on a second $200m Tesla factory in Shanghai, which is expected to produce around 10,000 utility-scale lithium-ion batteries, called Megapacks, per year. Lithium batteries are one of China’s “new three” priority industries as Xi tries to pivot the economy towards high-tech, renewable infrastructure. The other two priority areas – EVs and solar panels – are also both Tesla products, though to a lesser extent regarding solar panels.\n\nWith large investments in two out of three of China’s economic priorities, Musk has been welcomed to the country with open arms. Reporting on the new battery factory in Shanghai, Chinese state media said: “Despite the US intensifying its crackdown on China’s new energy vehicle (NEV) sector, Tesla has chosen to further invest in China. This highlights industry leaders’ robust confidence in China’s high-tech advancement”.\n\nMusk is vocal about his support for the country – and its government – that many in Washington see as the US’s biggest threat. He has described China as “truly amazing” and tweeted his gratitude to the Chinese government for supporting Tesla’s business in China. The country accounts for around one-quarter of Tesla’s global revenues, and the lion’s share of vehicle manufacturing capacity. The Shanghai factory has the capacity to make more than 950,000 cars a year, compared with more than 650,000 from the California plant.\n\nLeaders in China may therefore want to leverage their support for Tesla into concessions from the new Trump administration, via Musk.\n\nTrump has promised to introduce 60% tariffs on all Chinese imports, eliciting ire from Beijing and exacerbating an already fractious relationship. Levies on Chinese electric vehicles are already 100%, something which Musk has criticised, while at the same time warning that Tesla will be “demolished” if not financially protected from the likes of BYD.\n\nTrump has pledged that US tariffs on Chinese EVs will to protect US carmakers. But the integrated nature of the EV supply chain, and China’s advanced position when it comes to battery technologies and the raw materials needed for EVs, means that few companies, including Tesla, can eliminate the need for Chinese parts in their products. For example, in October, following the latest round of US tariffs, which increased the levy on Chinese lithium-ion EV batteries from 7.5% to 25%, Tesla’s Model 3 car became unavailable for sales in the US. The car uses batteries made by the Chinese company CATL.\n\nDaniel Ives, the global head of technology research at Wedbush Securities, a financial services firm, predicts that Musk will use his “bromance” with Trump to negotiate beneficial terms for Tesla and its interests in China, such as a exemptions for Tesla and other EV companies on batteries. Those negotiations may extend as far as tempering Trump’s trade war with China. “To have [Musk] there, it offsets a little of the hawkishness from Rubio and others,” Ives said.\n\n“I think there are going to be carve-outs for Tesla when it comes to tariffs, as well for China,” Ives said. “That’s why Musk being a big part of the Trump presidency is so important”.\n\nAdditional research by Jasper Jolly",
          extracted_data: {
            summary:
              "Elon Musk, CEO of Tesla and SpaceX, has strong ties with both Donald Trump and Xi Jinping, which may influence US-China relations amid ongoing trade tensions. Musk's relationship with Trump has strengthened, leading to his appointment as leader of the Department of Government Efficiency. Meanwhile, Musk's close ties with China, including favorable business conditions for Tesla, position him as a key figure in navigating the trade war. Musk's influence could lead to exemptions for Tesla in US tariffs on Chinese imports, potentially easing tensions between the two superpowers.",
            keywords: [
              "Elon Musk",
              "Donald Trump",
              "Xi Jinping",
              "US-China relations",
              "Tesla",
              "trade war",
              "tariffs",
              "Department of Government Efficiency",
              "lithium-ion batteries",
              "Shanghai factory",
            ],
            facts: [
              "Elon Musk has close relationships with both Donald Trump and Xi Jinping.",
              "Musk endorsed Trump and donated over $100 million to his re-election campaign.",
              "Musk was appointed as the leader of the Department of Government Efficiency.",
              "Tesla opened its first overseas factory in Shanghai with favorable conditions from China.",
              "China accounts for around one-quarter of Tesla's global revenues.",
              "Trump has promised 60% tariffs on all Chinese imports.",
              "Tesla's Model 3 became unavailable in the US due to increased tariffs on Chinese batteries.",
            ],
            important_dates: {
              "2019": "Tesla opened its first overseas factory in Shanghai.",
              April:
                "Musk made a surprise trip to Beijing to meet with Chinese premier Li Qiang.",
              October:
                "US tariffs on Chinese lithium-ion EV batteries increased from 7.5% to 25%.",
            },
          },
        },
      ];
      //

      setExistingArticles(mockExistingArticles);
      setLoading(false);
    }, 1000); // Simulating network delay
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {existingArticles.map((existingArticle) => (
        <Link to={`/article/${existingArticle.id}`} key={existingArticle.id}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video relative">
              <img
                src={existingArticle.media_content[0].url}
                alt={existingArticle.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            {/* <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {existingArticle.}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(existingArticle.date)}
                </span>
              </div>
              <CardTitle className="line-clamp-2">
                {existingArticle.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {existingArticle.description}
              </p>
            </CardContent> */}
          </Card>
        </Link>
      ))}
    </div>
  );
}
