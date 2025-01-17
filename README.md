# TensorboltBurdaHackatum2024

[![Watch the video](https://img.youtube.com/vi/DtADUIGC8MA/0.jpg)](https://www.youtube.com/watch?v=DtADUIGC8MA)

## Inspiration
In today's modern world, we are inundated with an overwhelming amount of information, making it challenging to stay informed. Quality news on a global scale is scarce, and even more so when it comes to current and relevant updates. Additionally, the shift towards eco-friendly transportation has become imperative. Recognizing these challenges, we decided to tackle them simultaneously by providing high-quality, up-to-date news while also promoting the adoption of electric vehicles.

## What it does
Tensorbolt continuously and automatically parses RSS feeds, analyzing and enriching the data with advanced language models (LLMs). It identifies the most trending news in the electric vehicle sector by scoring and ranking the feeds. Based on the reliable and thoroughly analyzed data collected by our system, Tensorbolt generates unique, customizable articles. These articles are then published and shared across various platforms, ensuring that users receive high-quality, up-to-date information on electric cars

## How we built it

<img width="1075" alt="image" src="https://github.com/user-attachments/assets/8e401169-c2f0-4c93-952f-b25353396b97" />

<img width="1075" alt="image" src="https://github.com/user-attachments/assets/649741e4-d18e-460f-90ee-80c31020304c" />

1. We developed Tensorbolt using a multi-layered approach to ensure efficient data parsing, analysis, and content generation:

2. RSS Feed Parsing: Our system employs an RSS feed parser to collect all necessary information from each feed, including links to the original websites where the news articles are published. We then parse these websites to extract the full text of each news article.

3. Data Analysis with LLMs: Utilizing advanced language models (LLMs), we analyze the extracted content. The LLMs summarize the text, identify key facts, generate relevant keywords, and extract pertinent dates along with their associated information.

4. Embedding and Storage: The summarized and cleaned information is processed through embedding networks and stored in our vector database along with corresponding metadata. This process runs regularly in the background to ensure our database remains up-to-date.

5. Identifying Trending Topics: When a user makes a request, Tensorbolt analyzes the embedding space to determine the most trending topics by examining the connections between different news items. Articles that have a higher number of connections are deemed the hottest.

6. Content Generation: To generate a unique and reliable article, Tensorbolt clusters relevant news items. This method allows us to cross-verify information, ensuring the generated content is diverse and trustworthy.

7. User Customization: Users can easily define the focus of their articles by specifying a vector direction. Tensorbolt translates these preferences into embeddings and incorporates them into the search for the hottest news, tailoring the generated content to the user's interests.

8. Automated Pipeline: The entire content generation pipeline consists of multiple stages that automatically verify and cross-reference information with the facts stored in our system, ensuring accuracy and reliability in every article produced.

9. Media Generation: Images and a short style video can be generated with the help GPT and DALL-E 3, some well worded prompts and clever video generation.

## Deployment
<img width="1075" alt="image" src="https://github.com/user-attachments/assets/ad31a654-d350-4034-a58c-d18aec04d095" />

## Challenges we ran into
One of the primary challenges we faced was managing our time effectively to keep up with new ideas without diluting our focus, all while ensuring the high-quality implementation of our core functionalities. We had numerous exciting concepts, such as automatically generating relevant podcasts and enabling interactive article editing, in addition to our main objectives. However, limited time forced us to prioritize and concentrate on the most critical aspects of the project.

Additionally, we encountered significant difficulties in implementing accurate and reliable clustering of trending news and extracting relevant information. Maintaining the relevance and timeliness of the news, while staying true to our focus on electric vehicles, proved to be a complex task.


## Accomplishments that we're proud of
1. Surviving the Hackathon: First and foremost, we successfully persevered until the end of the hackathon, demonstrating our resilience and commitment. 🙂

2. Successful Implementation: We achieved our goal of implementing the desired functionalities, and the system works as intended! This accomplishment validates our technical approach and teamwork.

3. Immersive Collaborative Experience: We were fortunate to immerse ourselves in an environment filled with active thinkers and idea-driven individuals. This atmosphere fueled our creativity and enhanced our collaborative efforts, making the project even more rewarding.

## What we learned
Through this project, we learned the importance of relentless dedication and the willingness to go the extra mile to achieve our goals. We developed the ability to construct complex logical chains that effectively reutilize language models within intricate heuristic pipelines, coupled with optimal semantic search techniques. Additionally, we gained valuable experience in implementing Retrieval-Augmented Search using LlamaIndex, ensuring both speed and quality in our search capabilities.


## What's next for Tensorbolt
As the volume of information in the world continues to grow, so must our efforts. We plan to optimize our system further by incorporating features like automatic podcast generation. Additionally, we aim to build a comprehensive map of interconnected news and information, creating a graph of top discussion topics that can vary based on geographic locations. This will enhance our ability to deliver highly relevant and localized content to our users.

