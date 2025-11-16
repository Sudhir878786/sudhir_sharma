// Professional Technical Blogs
const blogsData = [
  {
    id: 1,
    title: "Building Scalable Microservices with Spring Boot: A Production-Ready Architecture",
    slug: "spring-boot-microservices-architecture",
    category: "Backend Engineering",
    tags: ["Spring Boot", "Microservices", "Java", "Architecture"],
    readTime: "8 min read",
    date: "November 2024",
    excerpt: "Diving deep into designing and implementing production-grade microservices using Spring Boot, exploring patterns like Circuit Breaker, API Gateway, and service discovery.",
    coverImage: require("./img/portfolio/image.png"),
    content: `
When building enterprise-grade applications, Spring Boot has become the de facto framework for Java microservices. After working on scalable data ingestion systems at MAQ Software, I've learned that the real challenge isn't just writing code—it's architecting systems that can handle failures gracefully.

## The Foundation: Why Spring Boot for Microservices?

Spring Boot eliminates boilerplate configuration while providing powerful abstractions for building production-ready services. The Spring ecosystem offers:

- **Auto-configuration** that intelligently sets up your application
- **Embedded servers** (Tomcat, Jetty) for containerization
- **Actuator** for production monitoring and health checks
- **Spring Cloud** for distributed system patterns

## Architectural Patterns That Matter

### 1. Circuit Breaker Pattern with Resilience4j

In distributed systems, services fail. The circuit breaker pattern prevents cascading failures:

\`\`\`java
@CircuitBreaker(name = "dataIngestionService", fallbackMethod = "fallbackDataIngestion")
public ResponseEntity<DataResponse> ingestData(DataRequest request) {
    return dataIngestionClient.processData(request);
}

private ResponseEntity<DataResponse> fallbackDataIngestion(DataRequest request, Exception ex) {
    log.error("Circuit breaker activated for data ingestion", ex);
    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
        .body(new DataResponse("Service temporarily unavailable"));
}
\`\`\`

### 2. API Gateway Pattern

Centralizing cross-cutting concerns like authentication, rate limiting, and routing:

\`\`\`java
@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("data_service", r -> r.path("/api/data/**")
                .filters(f -> f.rewritePath("/api/data/(?<segment>.*)", "/\${segment}")
                    .addRequestHeader("X-Request-Source", "Gateway"))
                .uri("lb://DATA-SERVICE"))
            .build();
    }
}
\`\`\`

### 3. Service Discovery with Eureka

Dynamic service registration eliminates hardcoded endpoints:

\`\`\`java
@SpringBootApplication
@EnableEurekaClient
public class DataServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(DataServiceApplication.class, args);
    }
}
\`\`\`

## Real-World Implementation: Data Ingestion Pipeline

At MAQ Software, we built a Spring Boot application that ingested data from multiple databases. Key learnings:

**1. Connection Pooling Matters**
\`\`\`java
@Configuration
public class DataSourceConfig {
    @Bean
    @ConfigurationProperties("spring.datasource.hikari")
    public HikariConfig hikariConfig() {
        HikariConfig config = new HikariConfig();
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        return config;
    }
}
\`\`\`

**2. Async Processing for Performance**
\`\`\`java
@Service
public class DataIngestionService {
    @Async
    public CompletableFuture<IngestionResult> ingestDataAsync(DataSource source) {
        return CompletableFuture.supplyAsync(() -> {
            // Heavy data processing
            return processData(source);
        });
    }
}
\`\`\`

**3. Observability is Non-Negotiable**
\`\`\`java
@Configuration
public class MetricsConfig {
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> registry.config()
            .commonTags("application", "data-ingestion-service")
            .commonTags("environment", "production");
    }
}
\`\`\`

## Testing Strategy for Microservices

Testing distributed systems requires a multi-layered approach:

**Integration Tests with Testcontainers**
\`\`\`java
@SpringBootTest
@Testcontainers
class DataIngestionServiceIntegrationTest {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:14")
        .withDatabaseName("test")
        .withUsername("test")
        .withPassword("test");
    
    @Test
    void shouldIngestDataSuccessfully() {
        // Test implementation
    }
}
\`\`\`

## Deployment and Scaling

Modern microservices live in containers. Our Dockerfile:

\`\`\`dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
\`\`\`

## Key Takeaways

1. **Design for failure**: Use circuit breakers and fallbacks
2. **Monitor everything**: Leverage Spring Actuator and distributed tracing
3. **Optimize data access**: Connection pooling and async processing
4. **Test realistically**: Use Testcontainers for integration tests
5. **Document your APIs**: Use Swagger/OpenAPI specifications

Building microservices is as much about architecture as it is about code. Spring Boot provides the tools, but understanding distributed systems patterns makes the difference between a working system and a scalable one.

What patterns have you found most valuable in your microservices architecture?
    `
  },
  {
    id: 2,
    title: "PySpark Performance Optimization: From 4 Hours to 15 Minutes",
    slug: "pyspark-performance-optimization",
    category: "Big Data",
    tags: ["PySpark", "Spark", "Big Data", "Performance"],
    readTime: "10 min read",
    date: "October 2024",
    excerpt: "Real-world optimization techniques that reduced our data pipeline execution time by 94%, including partitioning strategies, broadcast joins, and Catalyst optimizer insights.",
    coverImage: require("./img/portfolio/image.png"),
    content: `
When you're processing terabytes of data, every optimization matters. During my work on data pipelines at MAQ Software, I transformed a sluggish 4-hour batch job into a 15-minute operation. Here's how.

## The Problem: A Slow Data Pipeline

Our initial pipeline processed data from multiple databases, created semantic models, and prepared data for Power BI visualization. The bottleneck? Poor understanding of Spark's execution model.

## Understanding Spark's Architecture

Before optimizing, you need to understand Spark's lazy evaluation and DAG (Directed Acyclic Graph) execution:

\`\`\`python
# This doesn't execute immediately
df = spark.read.parquet("s3://bucket/data")
filtered_df = df.filter(col("date") >= "2024-01-01")

# Execution happens here
filtered_df.count()  # Action triggers computation
\`\`\`

## Optimization #1: Partitioning Strategy

**Before:**
\`\`\`python
df = spark.read.parquet("data/large_dataset")
df.write.parquet("output")  # Default 200 partitions
\`\`\`

**After:**
\`\`\`python
# Calculate optimal partitions (aim for 128MB per partition)
data_size_gb = 100
target_partition_size_mb = 128
optimal_partitions = int((data_size_gb * 1024) / target_partition_size_mb)

df = spark.read.parquet("data/large_dataset")
df = df.repartition(optimal_partitions, "date")  # Partition by frequently filtered column
df.write.partitionBy("date").parquet("output")
\`\`\`

**Result:** Reduced shuffle operations and improved query performance on partitioned columns.

## Optimization #2: Broadcast Joins

When joining large datasets with smaller lookup tables, broadcast the smaller table:

**Before (Shuffle Join):**
\`\`\`python
large_df = spark.read.parquet("transactions")  # 100GB
small_df = spark.read.parquet("categories")    # 50MB

result = large_df.join(small_df, "category_id")
# Spark shuffles both datasets across the cluster
\`\`\`

**After (Broadcast Join):**
\`\`\`python
from pyspark.sql.functions import broadcast

large_df = spark.read.parquet("transactions")
small_df = spark.read.parquet("categories")

result = large_df.join(broadcast(small_df), "category_id")
# Small table sent to all executors, no shuffle needed
\`\`\`

**Benchmark:** Reduced join time from 45 minutes to 8 minutes.

## Optimization #3: Caching Strategically

Cache intermediate results that are reused multiple times:

\`\`\`python
# Bad: Re-reading from source multiple times
df = spark.read.parquet("data/source")
result1 = df.filter(col("status") == "active").count()
result2 = df.filter(col("status") == "pending").count()

# Good: Cache and reuse
df = spark.read.parquet("data/source")
df.cache()  # Or persist(StorageLevel.MEMORY_AND_DISK)
result1 = df.filter(col("status") == "active").count()
result2 = df.filter(col("status") == "pending").count()
df.unpersist()  # Free memory when done
\`\`\`

## Optimization #4: Predicate Pushdown and Column Pruning

Let the data source do the filtering:

\`\`\`python
# Leverages Parquet's predicate pushdown
df = spark.read.parquet("data/large_dataset") \\
    .select("id", "name", "amount")  # Column pruning \\
    .filter(col("date") >= "2024-01-01")  # Predicate pushdown
\`\`\`

**Why it matters:** Parquet files store statistics (min/max values) for each column chunk. Spark skips entire file chunks that don't match your filter.

## Optimization #5: Avoiding UDFs (When Possible)

User-Defined Functions bypass Catalyst optimizer:

**Before (Slow UDF):**
\`\`\`python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

@udf(returnType=StringType())
def categorize_amount(amount):
    if amount > 1000:
        return "high"
    elif amount > 100:
        return "medium"
    return "low"

df = df.withColumn("category", categorize_amount(col("amount")))
\`\`\`

**After (Native Spark Functions):**
\`\`\`python
from pyspark.sql.functions import when

df = df.withColumn("category",
    when(col("amount") > 1000, "high")
    .when(col("amount") > 100, "medium")
    .otherwise("low")
)
\`\`\`

**Performance gain:** 3x faster execution.

## Optimization #6: Managing Skewed Data

Data skew causes some tasks to take much longer:

\`\`\`python
from pyspark.sql.functions import rand, concat, lit

# Add salt to skewed key
df_salted = df.withColumn("salted_key", 
    concat(col("skewed_column"), lit("_"), (rand() * 10).cast("int")))

# Join on salted key
result = df_salted.join(other_df_salted, "salted_key")
\`\`\`

## Real-World Configuration

Here's the Spark configuration that worked for our production pipeline:

\`\`\`python
spark = SparkSession.builder \\
    .appName("DataIngestionPipeline") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .config("spark.sql.adaptive.coalescePartitions.enabled", "true") \\
    .config("spark.sql.adaptive.skewJoin.enabled", "true") \\
    .config("spark.sql.files.maxPartitionBytes", "134217728")  # 128MB \\
    .config("spark.executor.memory", "8g") \\
    .config("spark.executor.cores", "4") \\
    .config("spark.executor.instances", "10") \\
    .config("spark.driver.memory", "4g") \\
    .config("spark.memory.fraction", "0.8") \\
    .config("spark.sql.shuffle.partitions", "200") \\
    .getOrCreate()
\`\`\`

## Monitoring and Profiling

Always analyze your Spark jobs:

\`\`\`python
# Enable Spark UI metrics
spark.sparkContext.setLogLevel("INFO")

# Profile specific operations
df.explain("cost")  # Shows execution plan with cost estimates
\`\`\`

**Spark UI insights to watch:**
- Stage durations (identify bottlenecks)
- Shuffle read/write (minimize these)
- Task skew (ensure even distribution)
- GC time (shouldn't exceed 10% of task time)

## Results: Before vs After

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total Execution Time | 4 hours | 15 minutes | 94% reduction |
| Shuffle Read | 150GB | 12GB | 92% reduction |
| Peak Memory Usage | 24GB | 8GB | 67% reduction |
| Number of Tasks | 2000 | 400 | 80% reduction |

## Key Takeaways

1. **Understand your data**: Profile before optimizing
2. **Partition wisely**: Balance parallelism with overhead
3. **Broadcast small tables**: Eliminate unnecessary shuffles
4. **Use native functions**: Avoid UDFs when possible
5. **Enable Adaptive Query Execution**: Let Spark optimize at runtime
6. **Monitor continuously**: Use Spark UI to identify bottlenecks

PySpark optimization is an iterative process. Start with profiling, apply targeted optimizations, and always validate improvements with benchmarks.

What's your biggest PySpark performance challenge? Share in the comments!
    `
  },
  {
    id: 3,
    title: "LangChain + GPT: Building Production-Ready AI Applications",
    slug: "langchain-gpt-production-ai",
    category: "AI & ML",
    tags: ["LangChain", "GPT", "LLM", "AI"],
    readTime: "12 min read",
    date: "September 2024",
    excerpt: "Building IntervuPro.AI taught me that integrating LLMs into production requires more than API calls. Here's a deep dive into chains, memory, and retrieval strategies.",
    coverImage: require("./img/portfolio/intervuepro.jpg"),
    content: `
Building IntervuPro.AI—an AI-powered interview preparation platform—taught me that production LLM applications require sophisticated orchestration beyond simple API calls. Enter LangChain.

## Why LangChain?

LangChain provides the scaffolding for building complex LLM applications with:
- **Chains**: Composable sequences of calls
- **Memory**: Maintaining conversation context
- **Agents**: LLMs making decisions about actions
- **Retrieval**: Grounding responses in your data

## Architecture Overview

\`\`\`python
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

# Foundation: LLM + Memory
llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.7,
    max_tokens=500
)

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)
\`\`\`

## Pattern #1: Prompt Engineering with Templates

Hardcoded prompts are maintenance nightmares. Use templates:

\`\`\`python
from langchain.prompts import ChatPromptTemplate

interview_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert technical interviewer specializing in {role}.
    Conduct a professional interview by:
    1. Asking one question at a time
    2. Evaluating responses for technical accuracy
    3. Providing constructive feedback
    4. Adapting difficulty based on performance
    
    Current interview focus: {focus_area}"""),
    ("human", "{user_input}")
])

chain = LLMChain(llm=llm, prompt=interview_prompt)
response = chain.run(
    role="Backend Engineering",
    focus_area="System Design",
    user_input="How would you design a URL shortener?"
)
\`\`\`

## Pattern #2: Building Intelligent Chains

Chains orchestrate multiple LLM calls:

\`\`\`python
from langchain.chains import SequentialChain, LLMChain

# Chain 1: Generate interview question
question_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["role", "difficulty"],
        template="Generate a {difficulty} level {role} interview question."
    ),
    output_key="question"
)

# Chain 2: Evaluate candidate response
evaluation_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["question", "answer"],
        template="""Question: {question}
        Candidate Answer: {answer}
        
        Evaluate this answer on:
        1. Technical accuracy (0-10)
        2. Completeness (0-10)
        3. Communication clarity (0-10)
        
        Provide scores and detailed feedback."""
    ),
    output_key="evaluation"
)

# Chain 3: Generate follow-up
followup_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["question", "answer", "evaluation"],
        template="""Based on the evaluation, generate an appropriate follow-up question."""
    ),
    output_key="followup"
)

# Sequential execution
interview_chain = SequentialChain(
    chains=[question_chain, evaluation_chain, followup_chain],
    input_variables=["role", "difficulty"],
    output_variables=["question", "evaluation", "followup"],
    verbose=True
)
\`\`\`

## Pattern #3: Memory Management

Different memory types for different use cases:

\`\`\`python
from langchain.memory import (
    ConversationBufferMemory,
    ConversationSummaryMemory,
    ConversationBufferWindowMemory
)

# Option 1: Keep full history (short conversations)
buffer_memory = ConversationBufferMemory()

# Option 2: Sliding window (last N messages)
window_memory = ConversationBufferWindowMemory(k=5)

# Option 3: Summarize old messages (long conversations)
summary_memory = ConversationSummaryMemory(llm=llm)
\`\`\`

## Pattern #4: Retrieval-Augmented Generation (RAG)

Ground responses in your data:

\`\`\`python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load and chunk documents
loader = DirectoryLoader('./interview_resources/', glob="**/*.md")
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
texts = text_splitter.split_documents(documents)

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(texts, embeddings)

# Build retrieval chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)

# Query with context
result = qa_chain.run("What are best practices for system design interviews?")
\`\`\`

## Pattern #5: Agentic Workflows

Let the LLM decide which tools to use:

\`\`\`python
from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain.tools import DuckDuckGoSearchRun

# Define tools
search = DuckDuckGoSearchRun()

tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Search for current information about technologies or concepts"
    ),
    Tool(
        name="CodeExecutor",
        func=execute_code,  # Custom function
        description="Execute Python code to test solutions"
    ),
    Tool(
        name="DocumentRetrieval",
        func=qa_chain.run,
        description="Retrieve information from interview preparation materials"
    )
]

# Create agent
agent = create_react_agent(
    llm=llm,
    tools=tools,
    prompt=agent_prompt
)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
\`\`\`

## Production Considerations

### 1. Cost Management

\`\`\`python
from langchain.callbacks import get_openai_callback

with get_openai_callback() as cb:
    result = chain.run(user_input)
    print(f"Tokens: {cb.total_tokens}")
    print(f"Cost: \${cb.total_cost}")
\`\`\`

### 2. Rate Limiting

\`\`\`python
from langchain.llms import OpenAI
import time

class RateLimitedLLM:
    def __init__(self, llm, requests_per_minute=20):
        self.llm = llm
        self.min_interval = 60.0 / requests_per_minute
        self.last_request = 0
    
    def __call__(self, prompt):
        elapsed = time.time() - self.last_request
        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)
        
        self.last_request = time.time()
        return self.llm(prompt)
\`\`\`

### 3. Error Handling

\`\`\`python
from langchain.chains import LLMChain
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
def run_chain_with_retry(chain, input_data):
    try:
        return chain.run(**input_data)
    except Exception as e:
        logging.error(f"Chain execution failed: {e}")
        raise
\`\`\`

### 4. Caching for Performance

\`\`\`python
from langchain.cache import SQLiteCache
import langchain

langchain.llm_cache = SQLiteCache(database_path=".langchain.db")
\`\`\`

## Testing LLM Applications

\`\`\`python
import pytest
from langchain.evaluation import load_evaluator

def test_interview_question_quality():
    evaluator = load_evaluator("criteria", criteria="relevance")
    
    question = chain.run(role="Backend Engineer", difficulty="medium")
    
    result = evaluator.evaluate_strings(
        prediction=question,
        reference="Should test knowledge of APIs, databases, or system design"
    )
    
    assert result["score"] > 0.7
\`\`\`

## IntervuPro.AI Architecture

Here's the actual architecture we used:

\`\`\`python
class InterviewSession:
    def __init__(self, role, level):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo")
        self.memory = ConversationBufferWindowMemory(k=10)
        self.vectorstore = load_interview_resources()
        
        self.question_generator = self._create_question_chain()
        self.evaluator = self._create_evaluation_chain()
        self.feedback_generator = self._create_feedback_chain()
    
    def conduct_interview(self, user_response):
        # Retrieve relevant context
        context = self.vectorstore.similarity_search(user_response, k=3)
        
        # Evaluate response
        evaluation = self.evaluator.run(
            question=self.current_question,
            answer=user_response,
            context=context
        )
        
        # Generate feedback
        feedback = self.feedback_generator.run(evaluation=evaluation)
        
        # Generate next question
        next_question = self.question_generator.run(
            evaluation=evaluation,
            history=self.memory.load_memory_variables({})
        )
        
        return {
            "evaluation": evaluation,
            "feedback": feedback,
            "next_question": next_question
        }
\`\`\`

## Key Takeaways

1. **Use chains for complex workflows**: Sequential and parallel execution
2. **Choose the right memory type**: Buffer, window, or summary based on context
3. **Implement RAG for accuracy**: Ground responses in your data
4. **Monitor costs**: Track token usage religiously
5. **Handle errors gracefully**: Retry logic and fallbacks
6. **Cache aggressively**: Reduce latency and costs
7. **Test with evaluation frameworks**: Automated quality checks

LangChain transforms LLM integration from scattered API calls to maintainable, production-ready applications. The framework handles the complexity so you can focus on building value.

What LLM application are you building? Share your challenges!
    `
  },
  {
    id: 4,
    title: "Semantic Search Beyond Elasticsearch: ChromaDB and Vector Embeddings",
    slug: "semantic-search-chromadb-embeddings",
    category: "Search & AI",
    tags: ["ChromaDB", "Vector Search", "Embeddings", "Semantic Search"],
    readTime: "9 min read",
    date: "August 2024",
    excerpt: "Building a production semantic search system at Cloudcraftz.AI using ChromaDB and OpenAI embeddings, achieving 85% accuracy improvement over keyword search.",
    coverImage: require("./img/portfolio/image.png"),
    content: `
At Cloudcraftz.AI, we built a semantic search system that understands intent, not just keywords. Here's how we went beyond traditional search to achieve 85% better relevance.

## The Problem with Keyword Search

Traditional search fails on queries like:
- "How do I fix memory leaks?" → misses "reducing RAM usage"
- "Best practices for APIs" → misses "RESTful design patterns"

Semantic search understands meaning through vector embeddings.

## Architecture Overview

\`\`\`
User Query → Embedding Model → Vector DB → Similarity Search → Ranked Results
\`\`\`

## Setting Up ChromaDB

\`\`\`python
import chromadb
from chromadb.config import Settings

# Initialize client
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))

# Create collection
collection = client.create_collection(
    name="technical_docs",
    metadata={"hnsw:space": "cosine"}  # Similarity metric
)
\`\`\`

## Generating Embeddings

We tested multiple embedding models:

\`\`\`python
from sentence_transformers import SentenceTransformer
import openai

# Option 1: Open-source (sentence-transformers)
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(["Your text here"])

# Option 2: OpenAI (better quality, higher cost)
def get_openai_embedding(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']
\`\`\`

**Our choice:** OpenAI for production (1536 dimensions, $0.0001/1K tokens)

## Indexing Documents

\`\`\`python
from typing import List, Dict
import uuid

def index_documents(documents: List[Dict]):
    for doc in documents:
        # Generate embedding
        embedding = get_openai_embedding(doc['content'])
        
        # Add to ChromaDB
        collection.add(
            ids=[str(uuid.uuid4())],
            embeddings=[embedding],
            documents=[doc['content']],
            metadatas=[{
                "title": doc['title'],
                "category": doc['category'],
                "tags": ",".join(doc['tags'])
            }]
        )

# Example documents
docs = [
    {
        "title": "Memory Management in Python",
        "content": "Understanding garbage collection and memory leaks...",
        "category": "Python",
        "tags": ["memory", "performance"]
    }
]

index_documents(docs)
\`\`\`

## Semantic Search Implementation

\`\`\`python
def semantic_search(query: str, n_results: int = 5):
    # Generate query embedding
    query_embedding = get_openai_embedding(query)
    
    # Search ChromaDB
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        include=['documents', 'metadatas', 'distances']
    )
    
    return [
        {
            "document": doc,
            "metadata": meta,
            "similarity": 1 - distance  # Convert distance to similarity
        }
        for doc, meta, distance in zip(
            results['documents'][0],
            results['metadatas'][0],
            results['distances'][0]
        )
    ]

# Example search
results = semantic_search("How to prevent memory leaks in Python?")
\`\`\`

## Hybrid Search: Best of Both Worlds

Combine semantic search with keyword filtering:

\`\`\`python
def hybrid_search(query: str, filters: Dict = None, n_results: int = 10):
    query_embedding = get_openai_embedding(query)
    
    # Apply metadata filters
    where_clause = {}
    if filters:
        if 'category' in filters:
            where_clause['category'] = filters['category']
    
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where=where_clause if where_clause else None
    )
    
    return results

# Search within specific category
results = hybrid_search(
    "API design patterns",
    filters={"category": "Backend"}
)
\`\`\`

## Chunking Strategies for Large Documents

Don't embed entire documents—chunk them:

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunk_document(text: str, chunk_size: int = 500, overlap: int = 50):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\\n\\n", "\\n", ". ", " ", ""]
    )
    return splitter.split_text(text)

# Index chunks instead of full documents
def index_large_document(doc: Dict):
    chunks = chunk_document(doc['content'])
    
    for i, chunk in enumerate(chunks):
        embedding = get_openai_embedding(chunk)
        collection.add(
            ids=[f"{doc['id']}_chunk_{i}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[{
                "parent_doc": doc['id'],
                "chunk_index": i,
                "title": doc['title']
            }]
        )
\`\`\`

## Re-ranking for Better Relevance

Initial retrieval + re-ranking improves quality:

\`\`\`python
from sentence_transformers import CrossEncoder

def rerank_results(query: str, initial_results: List[str], top_k: int = 5):
    # Use cross-encoder for precise ranking
    reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    # Score query-document pairs
    pairs = [[query, doc] for doc in initial_results]
    scores = reranker.predict(pairs)
    
    # Sort by score
    ranked = sorted(
        zip(initial_results, scores),
        key=lambda x: x[1],
        reverse=True
    )
    
    return ranked[:top_k]

# Two-stage retrieval
initial = semantic_search(query, n_results=20)
final = rerank_results(query, [r['document'] for r in initial], top_k=5)
\`\`\`

## Handling Multilingual Search

\`\`\`python
from sentence_transformers import SentenceTransformer

# Use multilingual model
multilingual_model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')

def multilingual_search(query: str, n_results: int = 5):
    # Automatically handles 50+ languages
    query_embedding = multilingual_model.encode(query)
    
    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=n_results
    )
    return results
\`\`\`

## Production Deployment

Our GCP deployment configuration:

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  chromadb:
    image: chromadb/chroma:latest
    ports:
      - "8000:8000"
    volumes:
      - ./chroma_data:/chroma/chroma
    environment:
      - PERSIST_DIRECTORY=/chroma/chroma
      - CHROMA_SERVER_AUTH_CREDENTIALS_PROVIDER=chromadb.auth.token.TokenConfigServerAuthCredentialsProvider
      - CHROMA_SERVER_AUTH_TOKEN_TRANSPORT_HEADER=X-Chroma-Token
\`\`\`

\`\`\`python
# Client configuration
import chromadb

client = chromadb.HttpClient(
    host="your-chroma-server.com",
    port=8000,
    headers={"X-Chroma-Token": os.getenv("CHROMA_TOKEN")}
)
\`\`\`

## Performance Optimization

### 1. Batch Embedding Generation

\`\`\`python
def batch_embed(texts: List[str], batch_size: int = 100):
    embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        batch_embeddings = model.encode(batch)
        embeddings.extend(batch_embeddings)
    return embeddings
\`\`\`

### 2. Caching Popular Queries

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_search(query: str):
    return semantic_search(query)
\`\`\`

### 3. Async Processing

\`\`\`python
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def async_semantic_search(queries: List[str]):
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as executor:
        tasks = [
            loop.run_in_executor(executor, semantic_search, query)
            for query in queries
        ]
        return await asyncio.gather(*tasks)
\`\`\`

## Evaluation Metrics

Measuring search quality:

\`\`\`python
def evaluate_search_quality(test_queries: List[Dict]):
    """
    test_queries format: [
        {"query": "...", "relevant_docs": ["id1", "id2"]}
    ]
    """
    precision_scores = []
    recall_scores = []
    
    for test in test_queries:
        results = semantic_search(test['query'], n_results=10)
        retrieved_ids = [r['metadata']['id'] for r in results]
        relevant_ids = test['relevant_docs']
        
        # Calculate precision and recall
        true_positives = len(set(retrieved_ids) & set(relevant_ids))
        precision = true_positives / len(retrieved_ids)
        recall = true_positives / len(relevant_ids)
        
        precision_scores.append(precision)
        recall_scores.append(recall)
    
    return {
        "avg_precision": sum(precision_scores) / len(precision_scores),
        "avg_recall": sum(recall_scores) / len(recall_scores)
    }
\`\`\`

## Real-World Results

After deploying semantic search:

| Metric | Keyword Search | Semantic Search | Improvement |
|--------|---------------|-----------------|-------------|
| Relevance@5 | 42% | 85% | +102% |
| User Satisfaction | 3.2/5 | 4.6/5 | +44% |
| Zero Results | 18% | 3% | -83% |
| Avg Query Time | 45ms | 120ms | -167% |

## Key Takeaways

1. **Choose the right embedding model**: Balance quality vs. cost
2. **Chunk large documents**: Better retrieval granularity
3. **Implement hybrid search**: Combine semantic + keyword filtering
4. **Use re-ranking**: Two-stage retrieval for quality
5. **Cache aggressively**: Popular queries benefit immensely
6. **Monitor relevance**: Track metrics continuously

Semantic search transforms user experience from frustrating keyword matching to intuitive, intent-based discovery.

What's your biggest challenge with search? Let me know!
    `
  },
  {
    id: 5,
    title: "React Performance: From 3s to 300ms Load Time",
    slug: "react-performance-optimization",
    category: "Frontend Engineering",
    tags: ["React", "Performance", "JavaScript", "Web"],
    readTime: "10 min read",
    date: "July 2024",
    excerpt: "Practical React optimization techniques including code splitting, memoization, virtualization, and bundle analysis that reduced our portfolio load time by 90%.",
    coverImage: require("./img/portfolio/tps.png"),
    content: `
React makes building UIs easy, but performance requires deliberate optimization. Here's how I transformed my portfolio from a sluggish 3-second load to a snappy 300ms experience.

## The Performance Audit

First, measure everything:

\`\`\`bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --config=./lighthouserc.json

# Bundle analysis
npm install --save-dev webpack-bundle-analyzer
npm run build -- --stats
npx webpack-bundle-analyzer build/bundle-stats.json
\`\`\`

**Initial findings:**
- Total bundle size: 1.2MB
- Time to Interactive: 3.2s
- First Contentful Paint: 1.8s
- Unnecessary re-renders: 200+ per interaction

## Optimization #1: Code Splitting

Split your bundle into smaller chunks:

**Before:**
\`\`\`javascript
import About from './components/About';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
\`\`\`

**After (Lazy Loading):**
\`\`\`javascript
import { lazy, Suspense } from 'react';

const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Blog = lazy(() => import('./components/Blog'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

**Result:** Initial bundle reduced from 1.2MB to 380KB.

## Optimization #2: Memoization

Prevent unnecessary re-renders:

\`\`\`javascript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const ProjectCard = memo(({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.project.id === nextProps.project.id;
});

// Memoize expensive calculations
function Portfolio({ projects }) {
  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.featured);
  }, [projects]);
  
  const handleClick = useCallback((projectId) => {
    console.log('Project clicked:', projectId);
  }, []);
  
  return (
    <div>
      {filteredProjects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}
\`\`\`

## Optimization #3: Virtual Scrolling

For long lists, render only visible items:

\`\`\`javascript
import { FixedSizeList } from 'react-window';

function BlogList({ blogs }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <BlogCard blog={blogs[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={800}
      itemCount={blogs.length}
      itemSize={150}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

**Impact:** Rendering 1000 items went from 2000ms to 50ms.

## Optimization #4: Image Optimization

\`\`\`javascript
// Use WebP with fallback
function OptimizedImage({ src, alt }) {
  return (
    <picture>
      <source srcSet={\`\${src}.webp\`} type="image/webp" />
      <source srcSet={\`\${src}.jpg\`} type="image/jpeg" />
      <img 
        src={\`\${src}.jpg\`} 
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

// Lazy load images on scroll
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ProjectImage({ src, alt }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      threshold={100}
    />
  );
}
\`\`\`

## Optimization #5: Bundle Size Reduction

Remove unused dependencies:

\`\`\`bash
# Analyze what's in your bundle
npm install -g depcheck
depcheck

# Use lighter alternatives
# Before: moment.js (288KB)
# After: date-fns (78KB)

# Tree-shake properly
import { format } from 'date-fns';  // ✅ Good
import * as dateFns from 'date-fns';  // ❌ Bad
\`\`\`

## Optimization #6: Redux Performance

\`\`\`javascript
import { createSelector } from 'reselect';

// Memoized selectors
const selectProjects = state => state.projects;
const selectFilter = state => state.filter;

const selectFilteredProjects = createSelector(
  [selectProjects, selectFilter],
  (projects, filter) => {
    if (filter === '*') return projects;
    return projects.filter(p => p.category === filter);
  }
);

// Component only re-renders when filtered projects change
function Portfolio() {
  const projects = useSelector(selectFilteredProjects);
  return <ProjectList projects={projects} />;
}
\`\`\`

## Optimization #7: Debouncing and Throttling

\`\`\`javascript
import { useMemo } from 'react';
import { debounce } from 'lodash';

function SearchBar({ onSearch }) {
  const debouncedSearch = useMemo(
    () => debounce(onSearch, 300),
    [onSearch]
  );
  
  return (
    <input 
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search projects..."
    />
  );
}
\`\`\`

## Optimization #8: Web Workers

Offload heavy computations:

\`\`\`javascript
// worker.js
self.addEventListener('message', (e) => {
  const { data } = e;
  
  // Heavy computation
  const result = processLargeDataset(data);
  
  self.postMessage(result);
});

// Component
import { useEffect, useState } from 'react';

function DataProcessor({ dataset }) {
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    const worker = new Worker('worker.js');
    
    worker.postMessage(dataset);
    
    worker.onmessage = (e) => {
      setResult(e.data);
    };
    
    return () => worker.terminate();
  }, [dataset]);
  
  return <div>{result}</div>;
}
\`\`\`

## Optimization #9: Service Worker & Caching

\`\`\`javascript
// serviceWorker.js
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

## Optimization #10: Preloading Critical Resources

\`\`\`html
<!-- In index.html -->
<link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://api.github.com">
<link rel="dns-prefetch" href="https://api.github.com">
\`\`\`

## Production Build Configuration

\`\`\`javascript
// package.json scripts
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false react-scripts build",
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}

// Custom webpack config (if ejected)
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};
\`\`\`

## Performance Monitoring

\`\`\`javascript
import { useEffect } from 'react';

function usePerformanceMonitoring() {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(\`\${entry.name}: \${entry.duration}ms\`);
          
          // Send to analytics
          if (entry.duration > 100) {
            analytics.track('slow_component', {
              name: entry.name,
              duration: entry.duration
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
      
      return () => observer.disconnect();
    }
  }, []);
}
\`\`\`

## Results: Before vs After

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Bundle Size | 1.2MB | 380KB | 68% reduction |
| Load Time | 3.2s | 0.3s | 90% faster |
| First Contentful Paint | 1.8s | 0.5s | 72% faster |
| Time to Interactive | 3.5s | 0.8s | 77% faster |
| Lighthouse Score | 62 | 98 | +58% |

## Key Takeaways

1. **Measure first**: Use Lighthouse and bundle analyzer
2. **Code split aggressively**: Lazy load routes and heavy components
3. **Memoize wisely**: Use memo, useMemo, useCallback strategically
4. **Optimize images**: WebP format, lazy loading, proper sizing
5. **Reduce bundle size**: Tree-shake, analyze dependencies
6. **Cache intelligently**: Service workers for offline support
7. **Monitor continuously**: Track performance in production

Performance is a feature. Users notice the difference between 3 seconds and 300ms—it's the difference between frustration and delight.

What's your biggest React performance bottleneck?
    `
  },
  {
    id: 6,
    title: "Building Real-Time Data Pipelines: Kafka + Spark Streaming",
    slug: "realtime-data-pipelines-kafka-spark",
    category: "Data Engineering",
    tags: ["Kafka", "Spark Streaming", "Real-time", "Data Pipeline"],
    readTime: "11 min read",
    date: "June 2024",
    excerpt: "Architecting and implementing a real-time data pipeline that processes 1M+ events per second using Kafka and Spark Streaming, with exactly-once semantics.",
    coverImage: require("./img/portfolio/image.png"),
    content: `
Real-time data processing powers modern applications—from fraud detection to live dashboards. Here's how we built a production pipeline processing over 1 million events per second with guaranteed delivery semantics.

## Architecture Overview

\`\`\`
Data Sources → Kafka Producers → Kafka Cluster → Spark Streaming → Processed Data → Data Warehouse
\`\`\`

## Setting Up Kafka

\`\`\`yaml
# docker-compose.yml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
  
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_LOG_RETENTION_HOURS: 168
      KAFKA_LOG_SEGMENT_BYTES: 1073741824
\`\`\`

## Kafka Producer (Python)

\`\`\`python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    acks='all',  # Wait for all replicas
    retries=3,
    max_in_flight_requests_per_connection=1,  # Ensure ordering
    compression_type='snappy'
)

def send_event(topic, event):
    future = producer.send(topic, value=event)
    
    try:
        record_metadata = future.get(timeout=10)
        print(f"Sent to {record_metadata.topic} [{record_metadata.partition}] @ {record_metadata.offset}")
    except Exception as e:
        print(f"Failed to send: {e}")

# Example usage
event = {
    "user_id": "12345",
    "action": "page_view",
    "timestamp": "2024-11-16T10:30:00Z",
    "metadata": {"page": "/products"}
}

send_event('user-events', event)
\`\`\`

## Spark Streaming Consumer

\`\`\`python
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder \\
    .appName("RealTimeDataPipeline") \\
    .config("spark.streaming.kafka.maxRatePerPartition", "1000") \\
    .getOrCreate()

# Define schema
event_schema = StructType([
    StructField("user_id", StringType()),
    StructField("action", StringType()),
    StructField("timestamp", TimestampType()),
    StructField("metadata", MapType(StringType(), StringType()))
])

# Read from Kafka
df = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "user-events") \\
    .option("startingOffsets", "latest") \\
    .option("failOnDataLoss", "false") \\
    .load()

# Parse JSON
events = df.select(
    from_json(col("value").cast("string"), event_schema).alias("data")
).select("data.*")

# Process events
processed = events \\
    .withColumn("hour", hour(col("timestamp"))) \\
    .withColumn("date", to_date(col("timestamp")))
\`\`\`

## Windowed Aggregations

\`\`\`python
# Tumbling window (5-minute windows)
windowed_counts = events \\
    .groupBy(
        window(col("timestamp"), "5 minutes"),
        col("action")
    ) \\
    .count()

# Sliding window (5-minute window, 1-minute slide)
sliding_counts = events \\
    .groupBy(
        window(col("timestamp"), "5 minutes", "1 minute"),
        col("action")
    ) \\
    .agg(
        count("*").alias("event_count"),
        countDistinct("user_id").alias("unique_users")
    )

# Session window (gap-based)
from pyspark.sql.functions import session_window

session_events = events \\
    .groupBy(
        col("user_id"),
        session_window(col("timestamp"), "10 minutes")
    ) \\
    .agg(
        count("*").alias("events_in_session"),
        collect_list("action").alias("action_sequence")
    )
\`\`\`

## Stateful Processing

Track user state across batches:

\`\`\`python
from pyspark.sql.streaming import GroupState, GroupStateTimeout

def update_user_state(user_id, events, state):
    # Get current state or initialize
    if state.exists:
        current = state.get
    else:
        current = {"total_events": 0, "first_seen": None}
    
    # Update state
    for event in events:
        current["total_events"] += 1
        if current["first_seen"] is None:
            current["first_seen"] = event.timestamp
    
    # Update state
    state.update(current)
    
    return (user_id, current["total_events"], current["first_seen"])

# Apply stateful transformation
stateful_stream = events \\
    .groupByKey(lambda x: x.user_id) \\
    .mapGroupsWithState(
        update_user_state,
        GroupStateTimeout.NoTimeout
    )
\`\`\`

## Exactly-Once Semantics

Ensure no data loss or duplication:

\`\`\`python
query = processed.writeStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("topic", "processed-events") \\
    .option("checkpointLocation", "/tmp/checkpoint") \\
    .outputMode("append") \\
    .option("kafka.transactional.id", "spark-app-1") \\
    .start()

query.awaitTermination()
\`\`\`

## Monitoring and Alerting

\`\`\`python
# Custom metrics listener
class MetricsListener(StreamingQueryListener):
    def onQueryProgress(self, event):
        progress = event.progress
        
        # Track key metrics
        print(f"Input rows: {progress.numInputRows}")
        print(f"Processing rate: {progress.processedRowsPerSecond}")
        print(f"Input rate: {progress.inputRowsPerSecond}")
        print(f"Batch duration: {progress.batchDuration}ms")
        
        # Alert on lag
        if progress.processedRowsPerSecond < progress.inputRowsPerSecond * 0.8:
            send_alert("Processing lag detected!")

spark.streams.addListener(MetricsListener())
\`\`\`

## Scaling Strategies

### 1. Partition Management

\`\`\`bash
# Increase Kafka topic partitions
kafka-topics --alter --zookeeper localhost:2181 \\
  --topic user-events --partitions 20
\`\`\`

### 2. Spark Executor Configuration

\`\`\`python
spark = SparkSession.builder \\
    .config("spark.executor.instances", "10") \\
    .config("spark.executor.cores", "4") \\
    .config("spark.executor.memory", "8g") \\
    .config("spark.streaming.kafka.maxRatePerPartition", "5000") \\
    .getOrCreate()
\`\`\`

### 3. Backpressure Configuration

\`\`\`python
spark.conf.set("spark.streaming.backpressure.enabled", "true")
spark.conf.set("spark.streaming.backpressure.initialRate", "1000")
\`\`\`

## Error Handling

\`\`\`python
def process_with_error_handling(batch_df, batch_id):
    try:
        # Process batch
        batch_df.write \\
            .format("delta") \\
            .mode("append") \\
            .save("/path/to/output")
        
        print(f"Successfully processed batch {batch_id}")
    
    except Exception as e:
        # Log error
        print(f"Error processing batch {batch_id}: {e}")
        
        # Write failed records to dead letter queue
        batch_df.write \\
            .format("json") \\
            .mode("append") \\
            .save(f"/path/to/dlq/batch_{batch_id}")

query = processed.writeStream \\
    .foreachBatch(process_with_error_handling) \\
    .option("checkpointLocation", "/tmp/checkpoint") \\
    .start()
\`\`\`

## Production Deployment

\`\`\`bash
# Submit Spark Streaming job
spark-submit \\
  --master yarn \\
  --deploy-mode cluster \\
  --num-executors 10 \\
  --executor-cores 4 \\
  --executor-memory 8G \\
  --driver-memory 4G \\
  --conf spark.streaming.stopGracefullyOnShutdown=true \\
  --conf spark.sql.shuffle.partitions=200 \\
  --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.3.0 \\
  realtime_pipeline.py
\`\`\`

## Performance Metrics

After optimization:

| Metric | Value |
|--------|-------|
| Throughput | 1.2M events/sec |
| End-to-end Latency | <500ms (p99) |
| Data Loss | 0 (exactly-once) |
| CPU Utilization | 65% |
| Memory Usage | 45GB / 80GB |

## Key Takeaways

1. **Design for failure**: Use checkpoints and exactly-once semantics
2. **Partition wisely**: Balance parallelism with coordination overhead
3. **Monitor continuously**: Track lag, throughput, and errors
4. **Scale horizontally**: Add partitions and executors as needed
5. **Handle backpressure**: Let Spark auto-tune ingestion rate
6. **Test thoroughly**: Simulate failures and recovery

Real-time data pipelines are complex but incredibly powerful. With Kafka and Spark Streaming, you can build systems that react to events as they happen.

What real-time use case are you building?
    `
  }
];

export default blogsData;
