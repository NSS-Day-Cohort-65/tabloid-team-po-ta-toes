﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Tabloid.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ImageLocation = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reactions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ImageLocation = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    IdentityUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ImageLocation = table.Column<string>(type: "text", nullable: true),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PublishDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Posts_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SubscriberUserProfileId = table.Column<int>(type: "integer", nullable: false),
                    ProviderUserProfileId = table.Column<int>(type: "integer", nullable: false),
                    BeginDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_ProviderUserProfileId",
                        column: x => x.ProviderUserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_SubscriberUserProfileId",
                        column: x => x.SubscriberUserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostReactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    ReactionId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostReactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostReactions_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostReactions_Reactions_ReactionId",
                        column: x => x.ReactionId,
                        principalTable: "Reactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostReactions_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostTags_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "49c029bf-ffd4-4309-90e3-b05d01f82dfd", "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", 0, "bb9cda6a-8445-45c3-a993-fcbd29c8ffae", "bob@williams.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEHT3pek/G/4Cl8wKB2NGBLcxDZvJ75nf1EYnJMNKPtqrTsIcbPczQD7Q67Cp2N3CXA==", null, false, "76e808fd-1a0f-421f-8fc4-96eda6715c51", false, "BobWilliams" },
                    { "a7d21fac-3b21-454a-a747-075f072d0cf3", 0, "d2cb9b79-cd5f-4e5e-967b-fddfd31154cc", "jane@smith.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEGdm+Y5PE83DAfK0wGvZjBPjtXCqQaot5Z4mwNERHinCLtvVbvD3BVDJGvoWZR9hwQ==", null, false, "976568b8-f04b-4304-9d93-06f28920b38d", false, "JaneSmith" },
                    { "c806cfae-bda9-47c5-8473-dd52fd056a9b", 0, "db1d153b-b4a7-4fba-9c49-e4c6559072fb", "alice@johnson.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEHULy9v2zb1NVmOeNSvz8fUi6DAjWoIFZYOUSuRdfujz7HmnbdbZOaT36ID1xGGINw==", null, false, "2ae0c425-b7f7-4c8b-8cf0-f8a473aa5975", false, "AliceJohnson" },
                    { "d224a03d-bf0c-4a05-b728-e3521e45d74d", 0, "cbba41be-dce5-4f79-b75d-7d8009033e6b", "Eve@Davis.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEGDw7yxRwjI2eNTbWrgva50/oDZMEP9ywOKCurERVB7xYJmnM+gPkm44WcAtBV5DGQ==", null, false, "049a9414-29bd-4ea5-9a4a-c271c61adf40", false, "EveDavis" },
                    { "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", 0, "7cc894e0-f6b9-470b-9669-368cf178902d", "john@doe.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEE1ykO5VjAEtSs54SfeNd/6TdDcRIDya9OFM4//7Mbvad415kNQIzKyY8jJ8dZaC7Q==", null, false, "ee0fd8cd-c533-4b39-994c-4dc967771d4d", false, "JohnDoe" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "5d7fc36b-bf88-4538-b043-0a475bbea009", "admina@strator.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEPDysiMpWToSSD+7Pt6grdm1NXPuS5RWAyIS/l28pkFJaferpYoNY/svyBpQZ1IRaA==", null, false, "29755bf2-56dd-4f02-9b86-6f8feb354565", false, "Administrator" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Celebrity" },
                    { 2, "Sports" },
                    { 3, "Gaming" }
                });

            migrationBuilder.InsertData(
                table: "Reactions",
                columns: new[] { "Id", "ImageLocation", "Name" },
                values: new object[,]
                {
                    { 1, "https://cdn-icons-png.flaticon.com/512/25/25297.png", "Thumbs Up" },
                    { 2, "https://cdn-icons-png.flaticon.com/512/1633/1633636.png", "Thumbs Down" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Conspiracy" },
                    { 2, "Trending" },
                    { 3, "New Release" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "CreateDateTime", "FirstName", "IdentityUserId", "ImageLocation", "IsActive", "LastName" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "https://robohash.org/numquamutut.png?size=150x150&set=set1", true, "Strator" },
                    { 2, new DateTime(2023, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "John", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", "https://robohash.org/nisiautemet.png?size=150x150&set=set1", true, "Doe" },
                    { 3, new DateTime(2022, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jane", "a7d21fac-3b21-454a-a747-075f072d0cf3", "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1", true, "Smith" },
                    { 4, new DateTime(2023, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Alice", "c806cfae-bda9-47c5-8473-dd52fd056a9b", "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1", true, "Johnson" },
                    { 5, new DateTime(2023, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bob", "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1", true, "Williams" },
                    { 6, new DateTime(2022, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Eve", "d224a03d-bf0c-4a05-b728-e3521e45d74d", "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1", true, "Davis" }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "Content", "CreateDateTime", "ImageLocation", "IsApproved", "PublishDateTime", "Title", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 1, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, eveniet amet quibusdam neque culpa aliquam consectetur quod ab. Perspiciatis expedita deserunt alias modi enim voluptates aliquid cum qui illo, cumque officiis aliquam dignissimos nesciunt veniam voluptatum dicta vitae magnam? Expedita voluptates facilis maxime nostrum rem ratione amet aliquid nemo ipsum, mollitia officiis animi! Nostrum excepturi totam officia voluptates optio rerum porro nam, sed laudantium voluptatem tempore minus obcaecati nemo natus unde vitae? Aspernatur reprehenderit optio ex in eveniet autem accusantium repellat nisi iure eligendi, itaque sint atque. Quam sequi perferendis tempora nisi cumque explicabo blanditiis quasi? Corporis aut eos tempora.", new DateTime(2023, 10, 9, 10, 0, 0, 0, DateTimeKind.Unspecified), "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cleveland.com%2Fresizer%2FfTBHPXlkMkx6hAoKulGFxst1GmA%3D%2F1280x0%2Fsmart%2Fadvancelocal-adapter-image-uploads.s3.amazonaws.com%2Fimage.cleveland.com%2Fhome%2Fcleve-media%2Fwidth2048%2Fimg%2Fent_impact_people%2Fphoto%2Fbritney-spears-smilesjpg-bc9ec1d98624efbe.jpg&f=1&nofb=1&ipt=5e4da77236a12324f6a3c0a1341db32de725afc4fbdf2de2fac077345ed58cdb&ipo=images", true, new DateTime(2023, 10, 9, 12, 0, 0, 0, DateTimeKind.Unspecified), "LEAVE BRITTANY ALONE!", 1 },
                    { 2, 2, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, eveniet amet quibusdam neque culpa aliquam consectetur quod ab. Perspiciatis expedita deserunt alias modi enim voluptates aliquid cum qui illo, cumque officiis aliquam dignissimos nesciunt veniam voluptatum dicta vitae magnam? Expedita voluptates facilis maxime nostrum rem ratione amet aliquid nemo ipsum, mollitia officiis animi! Nostrum excepturi totam officia voluptates optio rerum porro nam, sed laudantium voluptatem tempore minus obcaecati nemo natus unde vitae? Aspernatur reprehenderit optio ex in eveniet autem accusantium repellat nisi iure eligendi, itaque sint atque. Quam sequi perferendis tempora nisi cumque explicabo blanditiis quasi? Corporis aut eos tempora.", new DateTime(2023, 10, 9, 10, 0, 0, 0, DateTimeKind.Unspecified), "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theusaupdatezone.com%2Fwp-content%2Fuploads%2F2023%2F10%2FAmerican-football-600x337.webp&f=1&nofb=1&ipt=5bb1f470c193ed1422af81181e022635597b376160d5c4e52170a69d742fdf9b&ipo=images", false, null, "Football stuff", 1 }
                });

            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "Id", "BeginDateTime", "EndDateTime", "ProviderUserProfileId", "SubscriberUserProfileId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 1, 2 },
                    { 2, new DateTime(2023, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 10, 9, 14, 0, 0, 0, DateTimeKind.Unspecified), 1, 3 }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "Content", "CreateDateTime", "PostId", "Subject", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates facilis maxime nostrum rem ratione amet aliquid nemo ipsum, mollitia officiis animi! Nostrum excepturi totam officia voluptates optio rerum porro nam, sed laudantium voluptatem tempore minus obcaecati nemo natus unde vitae? Aspernatur reprehenderit optio ex in eveniet autem accusantium repellat nisi iure eligendi, itaque sint atque. Quam sequi perferendis tempora nisi cumque explicabo blanditiis quasi? Corporis aut eos tempora", new DateTime(2023, 10, 9, 13, 0, 0, 0, DateTimeKind.Unspecified), 1, "I LOVE BRITTANY", 2 },
                    { 2, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptates facilis maxime nostrum rem ratione amet aliquid nemo ipsum, mollitia officiis animi! Nostrum excepturi totam officia voluptates optio rerum porro nam, sed laudantium voluptatem tempore minus obcaecati nemo natus unde vitae? Aspernatur reprehenderit optio ex in eveniet autem accusantium repellat nisi iure eligendi, itaque sint atque. Quam sequi perferendis tempora nisi cumque explicabo blanditiis quasi? Corporis aut eos tempora", new DateTime(2023, 10, 9, 14, 0, 0, 0, DateTimeKind.Unspecified), 1, "I HATE BRITTANY", 3 }
                });

            migrationBuilder.InsertData(
                table: "PostReactions",
                columns: new[] { "Id", "PostId", "ReactionId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 1, 1, 3 },
                    { 2, 1, 2, 2 },
                    { 3, 1, 2, 4 },
                    { 4, 1, 1, 5 },
                    { 5, 1, 1, 6 }
                });

            migrationBuilder.InsertData(
                table: "PostTags",
                columns: new[] { "Id", "PostId", "TagId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserProfileId",
                table: "Comments",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_PostReactions_PostId",
                table: "PostReactions",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostReactions_ReactionId",
                table: "PostReactions",
                column: "ReactionId");

            migrationBuilder.CreateIndex(
                name: "IX_PostReactions_UserProfileId",
                table: "PostReactions",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CategoryId",
                table: "Posts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserProfileId",
                table: "Posts",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_PostTags_PostId",
                table: "PostTags",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostTags_TagId",
                table: "PostTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_ProviderUserProfileId",
                table: "Subscriptions",
                column: "ProviderUserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_SubscriberUserProfileId",
                table: "Subscriptions",
                column: "SubscriberUserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "PostReactions");

            migrationBuilder.DropTable(
                name: "PostTags");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Reactions");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
